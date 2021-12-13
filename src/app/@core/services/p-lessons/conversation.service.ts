import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Plevels } from '../../models/language/level.model';
import { Conversation } from '../../models/p-lessons/conversation.model';
import { Plesson } from '../../models/p-lessons/p-lesson.model';
import { SearchText } from '../../models/search.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class ConversationService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}

getallWp(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getConversationWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getConversationExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneConversation/${e}`;
  return this.http.get<any>(url, {headers});
}

add(data: Conversation): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addConversation`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

update(data: Conversation): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyConversation`;
  return this.http.post<BaseResponse<any>>(url, data,  {headers});
}

enableDisable(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enDisConversation/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteConversation/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

searchConversation(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchConversation`;
  return this.http.post<any>(url, data, {headers});
}

}
