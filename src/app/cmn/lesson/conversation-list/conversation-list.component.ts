import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Conversation } from 'src/app/@core/models/p-lessons/conversation.model';
import { SearchText } from 'src/app/@core/models/search.model';
import { ConversationService } from 'src/app/@core/services/p-lessons/conversation.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  public bind: Conversation[];
  p: number;
  itemsPerPage: number;
  totalItems: number;
  title = 'Conversation';
  model: SearchText = new SearchText();
  userteams: number[] = [];
  env = environment;
  admin = false;
  student = false;
  department = false;
  teacher = false;
  username: string;
  isFavorite = false;
  url: string;
  Modaltitle: string;
  constructor(private router: Router,
              private service: ConversationService,
              private toaster: Toaster,
              private sanitizer: DomSanitizer,
              private auth: AuthenticationService) {  }

  ngOnInit(): void {
    this.userteams.push(...this.auth.getLoggedValidUserTeamCodes());
    this.getAll(1);
    this.username = this.auth.getUsername();
    this.getType();
  }

  public getAll(e): void {
    this.service.getallWp(e).subscribe(x => {
      const data = x;
      if (data.status === 1) {
        this.bind = data.data.data;
        this.totalItems = data.data.total;
        this.itemsPerPage = data.data.per_page;
        this.bind.forEach( a => {
          a.url = this.sanitizer.bypassSecurityTrustResourceUrl(a.url);
        });
      }
    });
  }

  getPage(page) {
    this.p = page;
    this.getAll(this.p);
  }

  activeInactive(e) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Only Active ${this.title} will reflect`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Please!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.enableDisable(e).subscribe(res => {
          const data = res;
          if (data.status === 1) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Ok!',
              type: 'light',
            });
            this.getAll(this.p);
          } else if (data.status === 0) {
            this.toaster.open({
              text: data.message,
              caption: data.code + 'Error Occured!',
              type: 'danger',
            });
          } else {
            this.toaster.open({
              text: 'Something went wrong',
              caption: 'Error Occured!',
              type: 'danger',
            });
          }
        });
      }
    });
  }

  public remove(e) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you wont be able to revert this',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(e).subscribe(res => {
          const data = res;
          if (data.status === 1) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Ok!',
              type: 'light',
              position: 'bottom-center',
            });
            this.getAll(this.p);
          } else if (data.status === 0) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Error Occured!',
              type: 'danger',
              position: 'bottom-center',
            });
          } else {
            this.toaster.open({
              text: 'Something went Wrong',
              caption: data.code + ' Error Occured!',
              type: 'danger',
              position: 'bottom-center',
            });
          }
        });
      }
    });
  }

  search(e) {
    this.service.searchConversation(e).subscribe(res => {
      const data = res;
      if (data.status === 1 && data.data.data.length > 0) {
        this.bind = data.data.data;
        this.totalItems = data.data.total;
        this.itemsPerPage = data.data.per_page;
        this.bind.forEach(x => {
          x.url = this.sanitizer.bypassSecurityTrustResourceUrl(x.url);
        });
      } else if (data.status === 0) {
        this.toaster.open({
          text: data.message,
          caption: data.code + ' Error occured',
          type: 'danger',
        });
      } else if (data.data.total === 0) {
        this.toaster.open({
          text: 'Nothing found that matches: ' + this.model.searchText,
          caption: '404' + ' Error occured',
          type: 'danger',
        });
      }
    });
  }

  reset() {
    this.getAll(1);
  }

  getColArray(obj: any): xlsx.ColInfo[] {
    const columnsToHide = ['status'];
    const colArray: xlsx.ColInfo[] = Object.keys(obj).map(item => {
      return columnsToHide.includes(item) ? { hidden: true } : { width: 20 };
    });
    return colArray;
  }

  exportToExcel() {
    this.service.excelImport().subscribe(result => {
      const data = result.data;
      data.forEach(x => {
        if (x.status === 1) {
          x.status = 'Active';
        } else {
          x.status = 'In-Active';
        }
      });
      const fname = this.title + '_export_' + '.xlsx';
      this.exportAsExcelFile(data, fname);
    });
  }

  exportAsExcelFile(json: any[], excelFileName: string, colInfos?: xlsx.ColInfo[], opts?: xlsx.JSON2SheetOpts): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(json, opts);

    if (colInfos !== undefined) {
      worksheet['!cols'] = colInfos;
    }
    const workbook: xlsx.WorkBook = { Sheets: { ['data']: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, excelFileName);
  }

  getType() {
    if (this.userteams.includes(this.env.esylangTeams.admin) || this.userteams.includes(this.env.esylangTeams.superAdmin)) {
      return this.admin = true;
    } else if (this.userteams.includes(this.env.esylangTeams.teacher)) {
      return this.teacher = true;
    } else if (this.userteams.includes(this.env.esylangTeams.student)) {
      return this.student = true;
    } else if (this.userteams.includes(this.env.esylangTeams.depratment)) {
      return this.department = true;
    }
  }

  favorite() {
    this.isFavorite = !this.isFavorite;
  }

  viewConversation(e: Conversation) {
    this.url = e.url;
    this.Modaltitle = e.title;
    document.getElementById('openVideo').click();
  }

  getSearchText(event) {
    const text = event.target.value;
    if (text !== '') {
      this.model.searchText = text;
      this.search(this.model);
    } else {
      this.getAll(1);
      return;
    }

  }




}
