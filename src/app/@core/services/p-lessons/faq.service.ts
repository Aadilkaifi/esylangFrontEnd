import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Faq } from '../../models/p-lessons/faq.model';
import { Plesson } from '../../models/p-lessons/p-lesson.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class FaqService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallNp(e): Observable<BaseResponse<Faq>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllFaqs/${e}`;
  return this.http.get<BaseResponse<Faq>>(url, {headers});
}


update(data: Faq): Observable<BaseResponse<Faq>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyPfaq`;
  return this.http.post<BaseResponse<Faq>>(url, data,  {headers});
}


add(data: Faq): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addPFaq`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}


single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}gePsingleFaq/${e}`;
  return this.http.get<any>(url, {headers});
}


delete(e: number): Observable<BaseResponse<Faq>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}removeFaq/${e}`;
  return this.http.get<BaseResponse<Faq>>(url, {headers});
}

}
