import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { User } from '../@core/models/user.model';
import { AuthService } from '../@core/services/auth.service';
import { AuthenticationService } from '../@core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User = {} as User;
  submitted = false;
  data: any;
  token: any;
  toggle: boolean;
  passType = 'password';
  spinner = environment;
  teamsArray: number[];
  teams: any;

  constructor(private authService: AuthService, private router: Router,
              private toaster: Toaster,
              private auth: AuthenticationService) { }

  ngOnInit() {
  }

  authUser(login: NgForm) {
    this.submitted = true;
    const teamsss = [];
    this.authService.getToken(this.model).subscribe(res => {
      this.data = res;
      this.teams = res.teams;
      if (this.data.status === 1 && this.data !== null) {
        this.token = this.data.data.token;
        localStorage.setItem('Esylnag-token', this.token);
        localStorage.setItem('Esylang-username', res.user.username);
        const x = this.teams.map(team => team.team_code);
        this.auth.storeItem('teams', x);
        this.toaster.open({
          text: 'Welcome to Esylang Admin',
          caption: 'Hii, there',
          type: 'primary',
          position: 'bottom-center',
        });
        this.router.navigate(['lesson']);
      } else if (this.data.status === 0) {
        this.toaster.open({
          text: this.data.message,
          caption: this.data.code + ' Error Occured!',
          type: 'danger',
        });
      } else {
        this.toaster.open({
          text: 'something major went wrong',
          caption: this.data.code + ' Error Occured!',
          type: 'danger',
        });
      }
    });
  }

  togglePassword(event) {
    if (event === true) {
      this.passType = 'text';
    } else {
      this.passType = 'password';
    }
  }

}
