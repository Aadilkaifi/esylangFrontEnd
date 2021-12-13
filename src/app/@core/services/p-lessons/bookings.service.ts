import { Bookings } from './../../models/p-lessons/bookings.model';
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

export class BookingService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}

getallWp(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getBookingsWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getBookingsExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSingleBooking/${e}`;
  return this.http.get<any>(url, {headers});
}

update(data: Bookings): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}updateBookings`;
  return this.http.post<BaseResponse<any>>(url, data,  {headers});
}

searchBookings(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchBookings`;
  return this.http.post<any>(url, data, {headers});
}

}
