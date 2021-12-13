import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Language } from '../../models/language/language.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class LanguageService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLanuagesWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getallNp(): Observable<BaseResponse<Language>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLanguagesNp`;
  return this.http.get<BaseResponse<Language>>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLanguagesExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyLanguage`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}


add(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addLanguage`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

searchLang(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchLanguage`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneLanguage/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteLanguage/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableLanguage/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
