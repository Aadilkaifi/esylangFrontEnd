import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class PuserService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getUsersWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllpusersExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

searchPuser(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchpuser`;
  return this.http.post<any>(url, data, {headers});
}


enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enDispUser/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
