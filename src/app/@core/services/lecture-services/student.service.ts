import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getStudents(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getStudents?page=${e}`;
  return this.http.get<any>(url, {headers});
}
enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableStudent/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

updateStudent(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyStudent`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}


addStudent(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addStudent`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

singleStudent(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneStudent/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

deleteStudent(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteStudent/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

importExcel(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}stdExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

searchStudent(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchStudent`;
  return this.http.post<any>(url, e, {headers});
}



}
