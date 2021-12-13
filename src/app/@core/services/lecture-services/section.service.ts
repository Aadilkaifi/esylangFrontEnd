import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class SectionService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallNp(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSectionNp`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSections?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSectionsExcel`;
  return this.http.get<any>(url, {headers});
}

enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableSection/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifySection`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}


add(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addSection`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

search(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchSection`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneSection/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteSection/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}



}
