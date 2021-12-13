import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Vocabularies } from 'src/app/@core/models/p-lessons/vocabularies.model';
import { SearchText } from 'src/app/@core/models/search.model';
import { VocabulariesService } from 'src/app/@core/services/p-lessons/vocabularies.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.css']
})
export class VocabularyListComponent implements OnInit {
  public bind: Vocabularies[];
  p: number;
  itemsPerPage: number;
  totalItems: number;
  title = 'Vocabularies';
  model: SearchText = new SearchText();
  userteams: number[] = [];
  env = environment;
  admin = false;
  student = false;
  department = false;
  teacher = false;
  username: string;
  isFavorite = false;

  constructor(private router: Router,
    private service: VocabulariesService,
    private toaster: Toaster,
    private sanitizer: DomSanitizer,
    private auth: AuthenticationService) { }

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
      }
    });
  }

  getPage(page) {
    this.p = page;
    this.getAll(this.p);
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
  favorite() {
    this.isFavorite = !this.isFavorite;
  }

  viewVocabs(e) {
    this.router.navigate([`lesson/vocab-list/${e}`])
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
    this.service.searchVocabularies(e).subscribe(res => {
      const data = res;
      if (data.status === 1 && data.data.data.length > 0) {
        this.bind = data.data.data;
        this.totalItems = data.data.total;
        this.itemsPerPage = data.data.per_page;
      } else if (data.status === 0) {
        this.toaster.open({
          text: data.message,
          caption: data.code + ' Error occured',
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

}
