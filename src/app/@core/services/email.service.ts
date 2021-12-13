import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../models/baseResponse.model';
import { Blog } from '../models/blog/blog.model';
import { BlogCategories } from '../models/blog/categories.model';
import { Email } from '../models/email.model';
import { HeaderService } from './header.service';


@Injectable({
  providedIn: 'root',
})

export class EmailService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}

sendEmail(data: Email): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}sendEmail`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}





}
