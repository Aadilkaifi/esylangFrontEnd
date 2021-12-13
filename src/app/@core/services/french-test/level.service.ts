import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class LevelService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getallWp(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLevelsWp?page=${e}`;
  return this.http.get<any>(url, {headers});
}

getallNp(): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLevelNp`;
  return this.http.get<any>(url, {headers});
}

excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getLevelExcel`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

getCategory(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getCategories`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableLevel/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

update(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyLevel`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}


add(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addLevel`;
  return this.http.post<BaseResponse<any>>(url, data, { headers});
}

searchLevel(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchLevel`;
  return this.http.post<any>(url, data, {headers});
}

single(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneLevel/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

delete(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteLevel/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}



}
