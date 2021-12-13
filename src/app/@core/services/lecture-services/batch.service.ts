import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseResponse } from '../../models/baseResponse.model';
import { Students } from '../../models/lectures/student.model';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root',
})

export class BatchService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getBatches(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getBatches?page=${e}`;
  return this.http.get<any>(url, {headers});
}
getBatchesNoP(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getBatchesNoP`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}
enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableBatch/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

updateBatch(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyBatch`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}


addBatch(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addBatch`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

singleBatch(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getOneBatch/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

deleteBatch(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteBatch/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

searchBatch(data): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}searchBatches`;
  return this.http.post<any>(url, data, {headers});
}
excelImport(): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getAllBatchesExcel`;
  return this.http.get<BaseResponse<any>>(url,  {headers});
}



}
