import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Vocabularies } from '../../models/p-lessons/vocabularies.model';
import { SearchText } from '../../models/search.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class VocabulariesService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}

getallWp(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getVocabulariesWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getVocabulariesExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneVocabularies/${e}`;
  return this.http.get<any>(url, {headers});
}

add(data: Vocabularies): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addVocabulares`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

update(data: Vocabularies): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyVocabulary`;
  return this.http.post<BaseResponse<any>>(url, data,  {headers});
}

enableDisable(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enDisVocabularies/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteVocabularies/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

searchVocabularies(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchVocabularies`;
  return this.http.post<any>(url, data, {headers});
}

}
