import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
  ) { }

storeItem(name: string, item: any) {
  localStorage.removeItem(name);
  localStorage.setItem(name, JSON.stringify(item));
}

getLoggedValidUserTeamCodes(): number[] {
  const team: any = JSON.parse(localStorage.getItem('teams'));
  return team;
}

getUsername(): string {
  const username: any = localStorage.getItem('Esylang-username');
  return username;

}


getTeamName(teamCode): string{
  if (teamCode === 100) {
    return 'Teacher';
  } else if (teamCode === 101) {
    return 'Department';
  } else if (teamCode === 102) {
    return 'Admin';
  } else if (teamCode === 103) {
    return 'Super Admin';
  } else if (teamCode === 104) {
    return 'Student';
  }
}

}
