import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class WrittingService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllWrittingQuesWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getallNp(): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getParaNp`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllwriteQuesExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}updateWrittingQues`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}


add(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addWrittingQues`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

searchWrite(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchWrittingQ`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSingleQueWrite/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteWrittingQ/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
