import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Plevels } from '../../models/language/level.model';
import { SearchText } from '../../models/search.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class PlevelsService {
  serviceUrl = `${environment.serviceUrl}api/portal/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLevelsWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getallNp(): Observable<BaseResponse<Plevels>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLevelsNp`;
  return this.http.get<BaseResponse<Plevels>>(url, {headers});
}

excelImport(): Observable<BaseResponse<Plevels>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLevelsExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data: Plevels): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyLevels`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}


add(data: Plevels): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addLevels`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

searchLevel(data: SearchText): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchLevels`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneLevels/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteLevels/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableLevels/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
