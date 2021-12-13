import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class ResultService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getTeacherResultsWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getParaExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

searchResults(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchTeacherResult`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneTeacherResult/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


seenNotSeen(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}seenNotSeenResult/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


}
