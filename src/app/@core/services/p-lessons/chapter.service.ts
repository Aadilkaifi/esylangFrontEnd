import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Plevels } from '../../models/language/level.model';
import { Chapter } from '../../models/p-lessons/chapter.model';
import { Plesson } from '../../models/p-lessons/p-lesson.model';
import { SearchText } from '../../models/search.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class ChapterService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


update(data: Chapter): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyChapter`;
  return this.http.post<BaseResponse<any>>(url, data,  {headers});
}


add(data: Chapter): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addPChapter`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}


single(e: number): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}gePchapter/${e}`;
  return this.http.get<any>(url, {headers});
}

}
