import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Language } from 'src/app/@core/models/language/language.model';
import { Plevels } from 'src/app/@core/models/language/level.model';
import { Plesson } from 'src/app/@core/models/p-lessons/p-lesson.model';
import { Teacher } from 'src/app/@core/models/users.model.ts/teachet.model';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';
import { LanguageService } from 'src/app/@core/services/languages/language.service';
import { PlevelsService } from 'src/app/@core/services/languages/level.service';
import { PlessonsService } from 'src/app/@core/services/p-lessons/p-lessons.service';
import { TeachersService } from 'src/app/@core/services/users/teacher.service';
import { exerciseType } from 'src/app/@core/values/esylang-config';

@Component({
  selector: 'app-add-edit-lesson',
  templateUrl: './add-edit-lesson.component.html',
  styleUrls: ['./add-edit-lesson.component.css']
})
export class AddEditLessonComponent implements OnInit {
  id: string;
  model: Plesson = new Plesson();
  lang: Language[];
  teacher: Teacher[];
  level: Plevels[];
  titleHead = '';
  exType = [];
  sizeErrorMessageDocC = '';
  image: File = null;
  admin = false;

  constructor(private activatedRoute: ActivatedRoute,
              private teacherService: TeachersService,
              private langService: LanguageService,
              private levelService: PlevelsService,
              private toaster: Toaster,
              private service: PlessonsService,
              private router: Router,
              private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
    });
    if (this.id != null) {
      this.getSingle(this.id);
      this.titleHead = 'Edit';
    } else {
      this.titleHead = 'Add';

    }

    this.getLanguages();
    this.getLevels();
    this.getTeachers();
    this.exType = exerciseType;

  }



  formFo(form: NgForm) {
    if (this.id != null) {
      this.service.update(this.model).subscribe(res => {
        const data = res;
        if (data.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Ok!',
            type: 'light',
          });
          this.getSingle(this.id);
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


  public getLanguages() {
    this.langService.getallNp().subscribe(res => {
      const data = res.data as Array<Language>;
      if (data && data.length > 0) {
        this.lang = data;
      } else {
        this.toaster.open({
          text: 'languages not Found',
          caption: '404' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }



  public getLevels() {
    this.levelService.getallNp().subscribe(res => {
      const data = res.data as Array<Plevels>;
      if (data && data.length > 0) {
        this.level = data;
      } else {
        this.toaster.open({
          text: 'level not Found',
          caption: '404' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }



  public getTeachers() {
    this.teacherService.getallNp().subscribe(res => {
      const data = res.data as Array<Teacher>;
      if (data && data.length > 0) {
        this.teacher = data;
      } else {
        this.toaster.open({
          text: 'teacher not Found',
          caption: '404' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }


  getSingle(e) {
    this.service.single(e).subscribe(res => {
      const data = res.data;
      if (res.status === 1) {
        this.model = data;
      } else if (res.status === 0) {
        this.toaster.open({
          text: 'Opps! Could not get Lesson',
          caption: '401' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }


  public getUserType(){
    const team = this.auth.getLoggedValidUserTeamCodes();
    if (team[0] === 102){
      this.admin == true;
    }
  }



}
