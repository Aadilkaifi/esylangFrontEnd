import { environment } from './../../../../environments/environment';
import { Teams } from './../../../@core/models/users.model.ts/teams.model';
import { Levels } from './../../../@core/models/french-test/level.model';
import { AuthService } from './../../../@core/services/auth.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgForm } from '@angular/forms';
import { Users } from './../../../@core/models/users.model.ts/users.model';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from 'src/app/@core/models/language/language.model';
import { LanguageService } from 'src/app/@core/services/languages/language.service';
import { Plevels } from 'src/app/@core/models/language/level.model';
import { PlevelsService } from 'src/app/@core/services/languages/level.service';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  public url = 'User-List';
  public pipe = new DatePipe('en-US');
  model: Users = new Users();
  lang: Language[];
  teams: Teams[];
  level: Plevels[];
  title = '';
  id: string;
  env = environment;
  teacher = true;
  department = true;
  student = true;
  teamName: any;
  show = false;
  constructor(
    private router: Router,
    private toaster: Toaster,
    private service: AuthService,
    private langService: LanguageService,
    private levelService: PlevelsService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService

  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
    });
    if (this.id != null) {
      this.getSingle(this.id);
      this.title = 'Edit User';
      this.teamName = '';
    } else {
      this.title = 'Add User';
      this.teamName = 'user';
      this.show = true;
    }
    this.getLevels();
    this.getLanguages();
    this.getTeams();
  }

  eventHandler(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }

  addUser(userForm: NgForm) {
    if (this.id !== null) {
      this.service.updateUser(this.model).subscribe(res => {
        const data = res;
        if (res.status === 1) {
          this.toaster.open({
            text: data.message,
            caption: data.code + '',
            type: 'primary',
          });
          this.getSingle(this.id);
        } else if (data.status === 0) {
          this.toaster.open({
            text: data.message,
            caption: data.code + ' Error Occured!',
            type: 'danger',
          });
        }
      });

    } else {
      if (this.model.password !== this.model.confirmPassword) {
        const x = this.toaster.open({
          text: 'Password and confirm password does not match',
          caption: 'Validation Error',
          type: 'danger',
        });
        return x;
      } else {
        this.service.addUser(this.model).subscribe(res => {
          const data = res;
          if (res.status === 1) {
            this.toaster.open({
              text: data.message,
              caption: data.code + '',
              type: 'primary',
            });
            this.router.navigate([`/user/edit-user/${data.data}`]);
          } else if (data.status === 0) {
            this.toaster.open({
              text: data.message,
              caption: data.code + ' Error Occured!',
              type: 'danger',
            });
          }
        });
      }
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

  getTeamType(event: number) {
    console.log(event);
    // tslint:disable-next-line: triple-equals
    if (event == this.env.esylangTeams.student) {
      this.student = true;
      this.teacher = false;
      this.department = false;
    }
    // tslint:disable-next-line: triple-equals
    else if (event == this.env.esylangTeams.teacher) {
      this.student = false;
      this.teacher = true;
      this.department = false;
    }
    // tslint:disable-next-line: triple-equals
    else if (event == this.env.esylangTeams.depratment) {
      this.student = false;
      this.teacher = false;
      this.department = true;
    }
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

  getSingle(e) {
    this.service.singleUser(e).subscribe(res => {
      const data = res.data;
      if (res.status === 1) {
        this.model = data;
        this.model.teamCode = res.teamcode.teamCode;
        this.getTeamType(res.teamcode.teamCode);
        this.teamName = this.auth.getTeamName(this.model.teamCode);
        this.show = true;
      } else if (res.status === 0) {
        this.toaster.open({
          text: 'Opps! Could not get Lesson',
          caption: '401' + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }


}
