import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Chapter } from 'src/app/@core/models/p-lessons/chapter.model';
import { ChapterService } from 'src/app/@core/services/p-lessons/chapter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-chapter',
  templateUrl: './add-edit-chapter.component.html',
  styleUrls: ['./add-edit-chapter.component.css']
})
export class AddEditChapterComponent implements OnInit {
  lid: string;
  model: Chapter = new Chapter();
  titleHead = '';
  exType = [];
  sizeErrorMessageDocC = '';
  image: File = null;
  exist = false;
  ckeditorContent: string;
  admin = false;
  student = false;
  department = false;
  teacher = false;
  userteams: number[] = [];
  env = environment;

  constructor(private activatedRoute: ActivatedRoute,
              private toaster: Toaster,
              private service: ChapterService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.lid = param.get('id');
    });
    if (this.lid != null) {
      this.getSingle(this.lid);
      this.model.id = this.lid;
      this.titleHead = 'Edit';
    }else{
      this.titleHead = 'Add';
    }
    this.getType();

  }


  formFo(form: NgForm) {
    if (this.exist === true) {
      this.service.update(this.model).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.getSingle(this.lid);
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
      this.service.add(this.model).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.image = null;
          form.resetForm();
          this.getSingle(this.lid);
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
    }

  }

  getSingle(e) {
    this.service.single(e).subscribe(res => {
      const data = res.data  ;
      if (res.status === 1) {
        this.model = data;
        this.exist = true;
        this.titleHead = 'Edit';
      } else if (res.code === 404) {
        this.exist = false;
        this.titleHead = 'Add';
        this.toaster.open({
          text: res.message,
          caption: 'Warning',
          type: 'warning',
        });
      }
    });
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
