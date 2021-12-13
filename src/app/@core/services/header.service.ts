import { Toaster } from 'ngx-toast-notifications';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class HeaderService {

  constructor(
    private router: Router,
    private toaster: Toaster
  ) { }

  public getValue() {
    // return JSON.stringify(localStorage.getItem('token'));
    return localStorage.getItem('Esylnag-token');
  }


  public getHeader(): HttpHeaders {
    const authToken: string = this.getValue();
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    if (authToken != null) {
      headers = headers.set('Authorization', 'Bearer ' + authToken);
      return headers;
    } else {
      this.toaster.open({
        text: 'Login Expired',
        caption: 'Please Login Again',
        type: 'danger',
      });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
      headers = headers.set('Authorization', '');
      return headers;
    }
  }



}


