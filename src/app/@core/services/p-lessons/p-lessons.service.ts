import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Plevels } from '../../models/language/level.model';
import { Plesson } from '../../models/p-lessons/p-lesson.model';
import { SearchText } from '../../models/search.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class PlessonsService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}gePlessonssWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getallNp(): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllPlessonsNp`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<Plevels>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getPlessonsExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data: Plesson): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyPLesson`;
  return this.http.post<BaseResponse<any>>(url, data,  {headers});
}


add(data: Plesson): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addPlesson`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

searchPlessons(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchPlessons`;
  return this.http.post<any>(url, data, {headers});
}

filterLesson(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}filterLesson`;
  return this.http.post<any>(url, data, {headers});
}

single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOnePlesson/${e}`;
  return this.http.get<any>(url, {headers});
}

delete(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deletePlesson/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

enableDisable(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisablePlesson/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

getNextFiveLessons(e: number): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getNextFiveLessons/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
