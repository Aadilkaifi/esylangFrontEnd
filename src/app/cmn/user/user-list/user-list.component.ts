import { SearchText } from './../../../@core/models/search.model';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { User } from './../../../@core/models/user.model';
import { AuthService } from './../../../@core/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';
import { Teams } from 'src/app/@core/models/users.model.ts/teams.model';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  username: string;
  users: User[];
  p: number;
  itemsPerPage: number;
  totalItems: number;
  search: SearchText = new SearchText();
  title = 'Users';
  teams: Teams[];
  env = environment;

  constructor(private auth: AuthenticationService,
              private service: AuthService,
              private router: Router,
              private toaster: Toaster) {

  }

  ngOnInit(): void {
    this.username = this.auth.getUsername();
    this.getUsers(1);
    this.getTeams();
  }

  viewUser(e) {
    this.router.navigate([`/user/edit-user/${this.users[e].id}`]);
  }

  getPage(page) {
    this.p = page;
    this.getUsers(this.p);
  }
  reset() {
    this.getUsers(1);
  }

  public getUsers(e) {
    this.service.getUsersWp(e).subscribe(res => {
      const data = res;
      if (data.data.data) {
        this.users = data.data.data;
        this.totalItems = data.data.total;
        this.itemsPerPage = data.data.per_page;
      } else if (data.status === 0) {
        this.toaster.open({
          text: data.message,
          caption: data.code + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }

  activeInactive(e) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Only Active Users can Access',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Please!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.enableDisableUser(e).subscribe(res => {
          const data = res;
          if (data.status === 1) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Ok!',
              type: 'light',
              position: 'bottom-center',
            });
            this.getUsers(this.p);
          } else if (data.status === 0) {
            this.toaster.open({
              text: data.message,
              caption: data.code + 'Error Occured!',
              type: 'danger',
              position: 'bottom-center',
            });
          } else {
            this.toaster.open({
              text: 'Something went wrong',
              caption: data.code + 'Ok!',
              type: 'danger',
              position: 'bottom-center',
            });
          }
        });
      }
    });
  }

  getSearchText(event) {
    this.search.searchText = event.target.value;
    if (this.search.searchText === null) {
      this.getUsers(this.p);
    }
    this.searchUser(this.search);
  }

  searchUser(e) {
    this.service.searchUser(e).subscribe(res => {
      const data = res;
      if (data.status === 1 && data.data.data.length > 0) {
        this.users = data.data.data;
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

  public getTeams() {
    this.service.getTeams().subscribe(res => {
      const data = res.data as Array<Teams>;
      if (data && data.length > 0) {
        this.teams = data.filter(x => x.teamCode !== this.env.esylangTeams.superAdmin && x.teamCode !== this.env.esylangTeams.admin);
      } else {
        this.toaster.open({
          text: 'Teams not Found',
          caption: '404' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }

  exportToExcel() {
    this.service.excelImport().subscribe(result => {
      const data = result.data;
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

  filterTeam(event) {
    const reqTeamCode = event.target.value;
    if (reqTeamCode == 1) {
      this.getUsers(1);
      return;
    }
    const requestedItem = new SearchText();
    requestedItem.searchText = reqTeamCode;
    this.service.filterUser(requestedItem).subscribe(res => {
      const data = res;
      if (data.status === 1 && data.data.data.length > 0) {
        this.users = data.data.data;
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

}
