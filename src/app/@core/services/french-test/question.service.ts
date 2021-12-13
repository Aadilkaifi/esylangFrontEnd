import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { FrenchTestQuestion } from '../../models/french-test/question.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class FrenchQuestionService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


addQuestion(e): Observable<any> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}addQuestion`;
  return this.http.post<any>(url, e, { headers: header});
}


update(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}updateQuestion`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}


updateOption(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}updateOption`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

getOptions(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOptions`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

getSignleQues(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSingleQues/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


getfrenchTestResult(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getfrenchTestResult?page=${e}`;
  return this.http.get<any>(url, {headers});
}

xlxs(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getfrenchTestResultxlxs`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


getSignleOpt(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneOption/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


getQuesNum(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getQuesNum/${e}`;
  return this.http.get<any>(url, {headers});
}


getAllQues(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllQuesWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getAllQuesExcel(): Observable<BaseResponse<FrenchTestQuestion>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}quesExcel`;
  return this.http.get<BaseResponse<FrenchTestQuestion>>(url, {headers});
}

searchQuestion(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchQues`;
  return this.http.post<any>(url, data, {headers});
}



}
