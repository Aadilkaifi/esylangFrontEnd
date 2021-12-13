import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ReadQuestion } from '../../models/applications/reqd-ques.model';
import { BaseResponse } from '../../models/baseResponse.model';
import { Options } from '../../models/common/option.model';
import { Question } from '../../models/common/question.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class QuizQuestionService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
  constructor(private http: HttpClient, private header: HeaderService) { }


  addQuestion(e: Question): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}addQuiz`;
    return this.http.post<any>(url, e, { headers });
  }


  update(e: Question): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}updateQuestionQuiz`;
    return this.http.post<BaseResponse<any>>(url, e, { headers });
  }


  updateOption(data): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}updateOptionQuiz`;
    return this.http.post<BaseResponse<any>>(url, data, { headers });
  }

  getOptions(data): Observable<BaseResponse<Options>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getOptionsQuiz`;
    return this.http.post<BaseResponse<Options>>(url, data, { headers });
  }

  getSignleQues(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getSingleQuesQuiz/${e}`;
    return this.http.get<any>(url, { headers });
  }


  // getfrenchTestResult(e): Observable<any> {
  //   const headers = this.header.getHeader();
  //   const url = `${this.serviceUrl}getfrenchTestResult?page=${e}`;
  //   return this.http.get<any>(url, {headers});
  // }

  // xlxs(): Observable<BaseResponse<any>> {
  //   const headers = this.header.getHeader();
  //   const url = `${this.serviceUrl}getAllQuestionsExcelRead`;
  //   return this.http.get<BaseResponse<any>>(url, {headers});
  // }


  getSignleOpt(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getSingleOptionQuiz`;
    return this.http.post<BaseResponse<any>>(url, e, { headers });
  }


  getQuesNum(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}QuestionNumberQuiz/${e}`;
    return this.http.get<any>(url, { headers });
  }

  getExType(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getExerciseType/${e}`;
    return this.http.get<any>(url, { headers });
  }


  getAllQues(e, x): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getAllQuestionQuizWp?page=${x}`;
    return this.http.post<any>(url, e, { headers });
  }

  // getAllQuesExcel(): Observable<BaseResponse<any>> {
  //   const headers = this.header.getHeader();
  //   const url = `${this.serviceUrl}quesExcel`;
  //   return this.http.get<BaseResponse<any>>(url, {headers});
  // }


}
