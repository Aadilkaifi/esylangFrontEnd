import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Plevels } from '../../models/language/level.model';
import { SearchText } from '../../models/search.model';
import { Teacher } from '../../models/users.model.ts/teachet.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class TeachersService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getTeachersWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getallNp(): Observable<BaseResponse<Teacher>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllteachersNp`;
  return this.http.get<BaseResponse<Teacher>>(url, {headers});
}

excelImport(): Observable<BaseResponse<Teacher>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllTeachersExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}modifyTeacher`;
  return this.http.post<BaseResponse<any>>(url, data,  { headers: header});
}


add(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}addTeacher`;
  return this.http.post<BaseResponse<any>>(url, data, { headers: header});
}

searchTeacher(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchTeacher`;
  return this.http.post<any>(url, data, {headers});
}

single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneTeacherF/${e}`;
  return this.http.get<any>(url, {headers});
}

delete(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteTeachers/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

enableDisable(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enDisTeacher/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
