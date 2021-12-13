import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../@core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  team: string;
  imageUrl: string;
  constructor(private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.userInfo();
  }


  public userInfo() {
    const teamCode = this.auth.getLoggedValidUserTeamCodes();
    if (teamCode[0] === 100) {
      this.team = 'Teacher';
    } else if (teamCode[0] === 101) {
      this.team = 'Department';
    } else if (teamCode[0] === 102) {
      this.team = 'Admin';
    } else if (teamCode[0] === 103) {
      this.team = 'Super Admin';
    } else if (teamCode[0] === 104) {
      this.team = 'Student';
    }
    this.username = this.auth.getUsername();
  }

public logOut(){
  localStorage.removeItem('Esylnag-token');
  localStorage.removeItem('teams');
  localStorage.removeItem('Esylang-username');
  this.router.navigate(['login']);
}
}
