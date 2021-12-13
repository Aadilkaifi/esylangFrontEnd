import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class ParaService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllParaWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getallNp(): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getParaNp`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getParaExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyPara`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}


add(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addPara`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

searchPara(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchPara`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOnePara/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deletePara/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}



}
