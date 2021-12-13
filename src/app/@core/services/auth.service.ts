import { Teams } from './../models/users.model.ts/teams.model';
import { SearchText } from './../models/search.model';
import { Users } from './../models/users.model.ts/users.model';
import { BaseResponse } from './../models/baseResponse.model';
import { HeaderService } from './header.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serviceUrl = `${environment.serviceUrl}api/`;
  constructor(private http: HttpClient, private header: HeaderService) { }

  getToken(data): Observable<any> {
    const url = `${this.serviceUrl}login`;
    return this.http.post<any>(url, data);
  }

  getUsersWp(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getUsersList?page=${e}`;
    return this.http.get<any>(url, { headers });
  }
  getTeams(): Observable<BaseResponse<Teams>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getTeams`;
    return this.http.get<BaseResponse<Teams>>(url, { headers });
  }

  searchUser(e: SearchText): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}searchUser`;
    return this.http.post<any>(url, e, { headers });
  }


  addTeamUser(data): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}addTeamUser`;
    return this.http.post<BaseResponse<any>>(url, data, { headers });
  }

  removeTeamUser(data): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}removeTeamUser`;
    return this.http.post<BaseResponse<any>>(url, data, { headers });
  }

  addUser(data: Users): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}addNewUser`;
    return this.http.post<BaseResponse<any>>(url, data, { headers });
  }

  singleUser(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getSingleUser/${e}`;
    return this.http.get<BaseResponse<any>>(url, { headers });
  }

  enableDisableUser(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}enableDisableUser/${e}`;
    return this.http.get<BaseResponse<any>>(url, { headers });
  }

  updateUser(data: Users): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}updateUser`;
    return this.http.post<BaseResponse<any>>(url, data, { headers });
  }

  filterUser(data: SearchText): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}filterByTeam`;
    return this.http.post<any>(url, data, { headers });
  }

  excelImport(): Observable<BaseResponse<Users>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getUserExcel`;
    return this.http.get<BaseResponse<Users>>(url, {headers});
  }

}


