import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Vocab } from '../../models/p-lessons/vocab.model';
import { SearchText } from '../../models/search.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class VocabService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}

getallWp(e: number , p: Vocab): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getVocabWp?page=${e}`;
  return this.http.post<any>(url, p, {headers});
}
uploadVocabs(data): Observable<any> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}uploadVocabs`;
  return this.http.post<any>(url, data, { headers: header});
}

addAudioVocab(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addAudioVocab`;
  return this.http.post<any>(url, {headers});
}

excelImport(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getVocabExcel`;
  return this.http.post<BaseResponse<any>>(url, e , {headers});
}

single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getVocabSingle/${e}`;
  return this.http.get<any>(url, {headers});
}

add(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}addVocab`;
  return this.http.post<BaseResponse<any>>(url, data, { headers: header});
}

update(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}updateVocab`;
  return this.http.post<BaseResponse<any>>(url, data,  { headers: header});
}

enableDisable(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enDisVocabularies/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteVOcab/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

searchVocab(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchVocab`;
  return this.http.post<any>(url, data, {headers});
}

addAudio(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}addAudioVocab`;
  return this.http.post<BaseResponse<any>>(url, data, { headers: header});
}

}
