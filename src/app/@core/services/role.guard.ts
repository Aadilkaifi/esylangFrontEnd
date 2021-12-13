import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})


export class RoleGuard implements CanActivate {
  constructor(private router: Router,
              private auth: AuthenticationService) {

  }
  userTeam: number[] = [];
  env = environment;
  canActivate() {
    const teamCode = localStorage.getItem('teams');
    this.userTeam.push(...this.auth.getLoggedValidUserTeamCodes());
    if (this.userTeam.includes(this.env.esylangTeams.admin || this.env.esylangTeams.superAdmin)) {
      return this.router.navigate(['/dashboard/dashboard-main']);
    } else if (this.userTeam.includes(this.env.esylangTeams.teacher)) {
      return this.router.navigate(['/dashboard/dashboard-teacher']);
    } else if (this.userTeam.includes(this.env.esylangTeams.student)) {
      return this.router.navigate(['/dashboard/dashboard-student']);
    }
  }
}
