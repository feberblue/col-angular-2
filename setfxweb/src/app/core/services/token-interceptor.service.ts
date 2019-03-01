import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpEvent } from '@angular/common/http';

import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  intercept(req, next) {
    console.log("Ejecutando Token Interceptor");
    let authService = this.injector.get(StorageService);

    /*req = req.clone({headers : req.headers.set('Authorization', `Bearer ${authService.getCurrentToken()}`)});
    req = req.clone({headers : req.headers.set('Content-Type', 'application/json')});
    req = req.clone({headers : req.headers.set('Accept', 'application/json')});*/
    /*let tokenizerReq = req.clone({
      setHeaders:{
        'Authorization' : `Bearer ${authService.getCurrentToken()}`,
        'Content-Type': 'application/json'
      }
    });
*/
    let tokenizerReq = req.clone({headers : req.headers.set('Authorization', `Bearer ${authService.getCurrentToken()}`)});
    //console.log(tokenizerReq);
    return next.handle(tokenizerReq);
    /*console.log(authService.getCurrentToken());
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              console.log('event--->>>', event);
          }
          return event;
      }));*/
  }

  constructor(private injector : Injector) { }
}
