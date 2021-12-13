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

export class ListQuestionService {
  serviceUrl = `${environment.serviceUrl}api/`;
  constructor(private http: HttpClient, private header: HeaderService) { }


  addQuestion(e: ReadQuestion): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}addTeacherQuesList`;
    return this.http.post<any>(url, e, { headers });
  }


  update(e: ReadQuestion): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}updateQuestionList`;
    return this.http.post<BaseResponse<any>>(url, e, { headers });
  }


  updateOption(data): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}updateOptionlist`;
    return this.http.post<BaseResponse<any>>(url, data, { headers });
  }

  getOptions(data): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getOptionsList`;
    return this.http.post<BaseResponse<any>>(url, data, { headers });
  }

  getSignleQues(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getSingleQuesList/${e}`;
    return this.http.get<BaseResponse<any>>(url, { headers });
  }

  xlxs(): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getAllQuestionsExcelList`;
    return this.http.get<BaseResponse<any>>(url, { headers });
  }


  getSignleOpt(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getSingleOptionList/${e}`;
    return this.http.get<BaseResponse<any>>(url, { headers });
  }
  deleteAudio(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}removeAudio/${e}`;
    return this.http.get<BaseResponse<any>>(url, { headers });
  }


  getQuesNum(): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getQuestionNumberList`;
    return this.http.get<any>(url, { headers });
  }


  getAllQues(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getAllListQuestionWp?page=${e}`;
    return this.http.get<any>(url, { headers });
  }
  getAllAudios(e): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}allAudio?page=${e}`;
    return this.http.get<any>(url, { headers });
  }

  getAllAudiosNp(): Observable<BaseResponse<any>> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}getAllAudioNP`;
    return this.http.get<BaseResponse<any>>(url, { headers });
  }

  searchQuestion(data): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}questionSearchList`;
    return this.http.post<any>(url, data, { headers });
  }
  audioSearch(data): Observable<any> {
    const headers = this.header.getHeader();
    const url = `${this.serviceUrl}audioSearch`;
    return this.http.post<any>(url, data, { headers });
  }

  addAudio(data): Observable<any> {
    const header = new HttpHeaders();
    const url = `${this.serviceUrl}addAudio`;
    return this.http.post<any>(url, data, { headers: header });
  }

}
