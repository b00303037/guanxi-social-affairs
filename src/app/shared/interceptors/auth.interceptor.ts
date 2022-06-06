import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BaseAPIResModel } from 'src/app/api/models/base-api.models';
import { BaseAPICodes } from '../enums/base-api-codes.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<BaseAPIResModel<unknown>>,
    next: HttpHandler
  ): Observable<HttpEvent<BaseAPIResModel<unknown>>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<BaseAPIResModel<unknown>>) => {
        if (
          event instanceof HttpResponse &&
          event.body?.code === BaseAPICodes.AUTH_ERROR
        ) {
          event.body.message = '登入認證已過期，請重新登入';

          this.router.navigate(['/home']);
        }
      })
    );
  }
}
