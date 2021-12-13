import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ReadQuestion } from '../../models/applications/reqd-ques.model';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class ReadQuestionService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


addQuestion(e: ReadQuestion): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addTeacherQuesRead`;
  return this.http.post<any>(url, e, { headers});
}


update(e: ReadQuestion): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}updateQuestionRead`;
  return this.http.post<BaseResponse<any>>(url, e, { headers});
}


updateOption(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}updateOptionRead`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

getOptions(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOptionsRead`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

getSignleQues(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSingleQuesRead/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


// getfrenchTestResult(e): Observable<any> {
//   const headers = this.header.getHeader();
//   const url = `${this.serviceUrl}getfrenchTestResult?page=${e}`;
//   return this.http.get<any>(url, {headers});
// }

xlxs(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllQuestionsExcelRead`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


getSignleOpt(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSingleOptionRead/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


getQuesNum(): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getQuestionNumberRead`;
  return this.http.get<any>(url, {headers});
}


getAllQues(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllReadQuestionWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

// getAllQuesExcel(): Observable<BaseResponse<any>> {
//   const headers = this.header.getHeader();
//   const url = `${this.serviceUrl}quesExcel`;
//   return this.http.get<BaseResponse<any>>(url, {headers});
// }

searchQuestion(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}questionSearchRead`;
  return this.http.post<any>(url, data, {headers});
}



}
