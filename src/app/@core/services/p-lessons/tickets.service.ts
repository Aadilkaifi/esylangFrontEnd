import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Plevels } from '../../models/language/level.model';
import { Events } from '../../models/p-lessons/events.model';
import { SearchText } from '../../models/search.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class TicketsService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllTickets?page=${e}`;
  return this.http.get<any>(url, {headers});
}

replyTicket(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}replyTicket`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

add(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}addTicket`;
  return this.http.post<BaseResponse<any>>(url, data, { headers: header});
}

getTicketDetials(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getTicketDetials`;
  return this.http.post<BaseResponse<any>>(url, e, {headers});
}

getUserTickets(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getUserTickets`;
  return this.http.post<BaseResponse<any>>(url, {headers});
}
}
