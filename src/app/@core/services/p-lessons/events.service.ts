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

export class EventsService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getEventsWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<Events>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getEventsExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}modifyEvents`;
  return this.http.post<BaseResponse<any>>(url, data, { headers: header});
}

add(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}addEvent`;
  return this.http.post<BaseResponse<any>>(url, data, { headers: header});
}

searchLevel(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchEvent`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneEvent/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteEvent/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableEvent/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
