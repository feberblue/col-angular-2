import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorinterceptorService implements HttpInterceptor {

  constructor(private storage: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401 || err.status === 0) {
        console.log("usuario no autorizado");
        //this.storage.logout();
        //location.reload(true);
      }

      //const error = err.error.Message || err.statusText;
      const error = err.statusText;
      return throwError(err);
    }));
  }


}
