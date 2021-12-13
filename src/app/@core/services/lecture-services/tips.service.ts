import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class TipsService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getTips?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getTipssExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

getCategory(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getCategories`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableTips/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyTips`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}


add(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addTips`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

searchTips(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchTips`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneTip/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteTips/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}



}
