import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Vocab } from 'src/app/@core/models/p-lessons/vocab.model';
import { SearchText } from 'src/app/@core/models/search.model';
import { VocabService } from 'src/app/@core/services/p-lessons/vocab.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-vocab-list',
  templateUrl: './vocab-list.component.html',
  styleUrls: ['./vocab-list.component.css']
})
export class VocabListComponent implements OnInit {

  public bind: Vocab[];
  p: number;
  itemsPerPage: number;
  totalItems: number;
  title = 'Vocabs';
  model: SearchText = new SearchText();
  vocId: string;
  md: Vocab = new Vocab();
  xl: File = null;
  showAudio: boolean;
  sizeErrorMessageDocC = '';
  audio: File = null;
  templateUrl: string;
  userteams: number[] = [];
  env = environment;
  admin = false;
  student = false;
  department = false;
  teacher = false;
  username: string;


  constructor(private router: Router,
    private service: VocabService,
    private toaster: Toaster,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.md.vid = param.get('id');
      this.vocId = this.md.vid;
    });
    this.userteams.push(...this.auth.getLoggedValidUserTeamCodes());
    this.username = this.auth.getUsername();
    this.getAll(1, this.md);
    this.templateUrl = environment.storageBase + 'vocabsTemp.xlsx';
    this.getType();
  }

  downloadTemp(url) {
    const x = url;
    window.open(x, '_blank');
  }

  public getAll(p, m): void {
    this.service.getallWp(p, m).subscribe(x => {
      const data = x;
      if (data.status === 1) {
        this.bind = data.data.data;
        this.totalItems = data.data.total;
        this.itemsPerPage = data.data.per_page;
        this.bind.forEach(e => {
          if (e.audio === null) {
          } else if (e.audio !== null) {
            e.audio = environment.storageBase + e.audio;
          }
        });
      } else if (data.status === 0) {
        this.toaster.open({
          text: data.message,
          caption: data.code + ' Error Occured!',
          type: 'danger',
          position: 'bottom-center',
        });
      }
    });
  }

  getPage(page) {
    this.p = page;
    this.getAll(this.p, this.md);
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
            this.getAll(this.p, this.md);
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

  view(e) {
    this.router.navigate([`/lesson/edit-vocab/${e}`])
  }

  addVocab() {
    this.router.navigate([`/lesson/add-vocab/${this.vocId}`]);
  }

  search(e) {
    this.service.searchVocab(e).subscribe(res => {
      const data = res;
      if (data.status === 1 && data.data.data.length > 0) {
        this.bind = data.data.data;
        this.totalItems = data.data.total;
        this.itemsPerPage = data.data.per_page;
        this.bind.forEach(r => {
          if (r.audio === null) {
          } else if (r.audio !== null) {
            r.audio = environment.storageBase + r.audio;
          }
        });
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
    this.getAll(1, this.md);
  }

  getColArray(obj: any): xlsx.ColInfo[] {
    const columnsToHide = ['status'];
    const colArray: xlsx.ColInfo[] = Object.keys(obj).map(item => {
      return columnsToHide.includes(item) ? { hidden: true } : { width: 20 };
    });
    return colArray;
  }

  exportToExcel() {
    this.service.excelImport(this.md).subscribe(result => {
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

  public copyText(e) {

  }

  uploadVocabs(event): void {
    this.xl = event.target.files[0];
    if (this.xl !== null) {
      this.xlFo();
    }

  }

  xlFo() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('excel', this.xl, this.xl.name);
        formData.append('vid', this.vocId);
        this.service.uploadVocabs(formData).subscribe(res => {
          const data = res;
          if (data.status === 1) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Ok!',
              type: 'light',
            });
            this.getAll(this.p, this.md);
          } else if (data.status === 0) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Error Occured!',
              type: 'danger',
            });
          } else {
            this.toaster.open({
              text: 'Something went Wrong',
              caption: '401' + ' Error Occured!',
              type: 'danger',
            });
          }
        });
      } else if (result.isDenied) {
        this.xl = null;
        Swal.fire('Changes are not saved', '', 'info');
      }
    });

  }

  public uploadAudio(event, i): void {
    this.audio = event.target.files[0];
    if (this.audio.size !== null && this.audio.size <= 3000000) {
      const formData = new FormData();
      formData.append('audio', this.audio, this.audio.name);
      formData.append('id', i);
      this.service.addAudio(formData).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.getAll(this.p, this.md);
        } else if (data.status === 0) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Error Occured!',
            type: 'danger',
          });
        } else {
          this.toaster.open({
            text: 'Something went Wrong',
            caption: '401' + ' Error Occured!',
            type: 'danger',
          });
        }
      });
    } else {
      this.sizeErrorMessageDocC = 'File Exceed the size limit of 3mb';
      const sizeToMb = this.audio.size / 1000000;
      const roundedSize = sizeToMb.toFixed(2);
      this.toaster.open({
        text: this.sizeErrorMessageDocC + ' your file size is ' + roundedSize + 'mb',
        caption: ' Error Occured!',
        type: 'danger',
        position: 'bottom-center',
      });
      this.getAll(this.p, this.md);
    }
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

  getSearchText(event) {
    const text = event.target.value;
    if (text !== '') {
      this.model.searchText = text;
      this.search(this.model);
    } else {
      this.getAll(1, this.md);
      return;
    }

  }
}
