import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../models/baseResponse.model';
import { Blog } from '../models/blog/blog.model';
import { BlogCategories } from '../models/blog/categories.model';
import { HeaderService } from './header.service';


@Injectable({
  providedIn: 'root',
})

export class BlogService {
  serviceUrl = `${environment.serviceUrl}api/`;
constructor(private http: HttpClient, private header: HeaderService) {}


getBlogs(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getBlogs?page=${e}`;
  return this.http.get<any>(url, {headers});
}

enableDisable(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableBlog/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

singleBlog(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getSingleBlog/${e}`;
  return this.http.get<BaseResponse<Blog>>(url, {headers});
}

getCategories(): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getCategoriesC`;
  return this.http.get<any>(url, {headers});
}

updateBlog(data): Observable<any> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}modifyBlog`;
  return this.http.post<any>(url, data, {
    headers: header,
    });
}

addBlog(data): Observable<BaseResponse<any>> {
  const header  = new HttpHeaders();
  const url = `${this.serviceUrl}addNewBlog`;
  return this.http.post<BaseResponse<any>>(url, data, { headers: header});
}


deleteBlog(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteBlog/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}


enableDisableCat(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}enableDisableCatC/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

updateCategory(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}modifyCatC`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

addCategory(data): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}addCategoryC`;
  return this.http.post<BaseResponse<any>>(url, data, {headers});
}

singleCategory(e): Observable<any> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}getCatC/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

deleteCat(e): Observable<BaseResponse<any>> {
  const headers = this.header.getHeader();
  const url = `${this.serviceUrl}deleteCatC/${e}`;
  return this.http.get<BaseResponse<any>>(url, {headers});
}

}
