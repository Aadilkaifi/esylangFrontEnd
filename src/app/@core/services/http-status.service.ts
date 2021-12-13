import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, finalize, map } from 'rxjs/operators';
import { Toaster } from 'ngx-toast-notifications';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class HTTPStatus {
  private requestInFlight$: Subject<boolean>;

  constructor() {
    this.requestInFlight$ = new Subject();
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private status: HTTPStatus,  private toaster: Toaster, private route: Router) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.status.setHttpStatus(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.status.setHttpStatus(true);
    if (!req.headers.has('Content-Type')) {
      // req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((resp: HttpErrorResponse) => {
        const data: { message: string, m: string } = {
          message: resp.error ? resp.error.message : '',
          m: `Error occurred `,
        };
        try {
          const errors = Array.from(data.message.match(/\<(.*?)\>/));

          if (errors.length > 0) {
            data.message = errors[0].replace('<', '').replace('>', '');
          }
        } catch (e) {

        }
        this.toaster.open({
          text: data.message,
          caption: data.m,
          type: 'danger',
          position: 'bottom-center',
        });
        if (data.message === 'Unauthenticated.') {
          localStorage.removeItem('token');
          this.route.navigate(['/login']);
          this.toaster.open({
            text: 'Please Login again',
            caption: 'Login Expired',
            type: 'danger',
            position: 'bottom-center',
          });
        }

        return throwError(resp.error);
      }),
      finalize(() => {
        this.removeRequest(req);
      }),
    );
  }
}
