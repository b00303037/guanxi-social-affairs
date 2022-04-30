import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseAPICodes } from '../shared/enums/base-api-codes.enum';
import { BaseAPIResModel } from './models/base-api.models';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private baseApiUrl = environment.baseApiUrl;

  private defaultErrorMessage = '很抱歉，發生未預期的錯誤，請稍後再試一次';

  constructor(protected http: HttpClient) {}

  protected get<TRes>(uri: string, params?: HttpParams): Observable<TRes> {
    const url = this.baseApiUrl + uri;
    const options = {
      params,
    };

    return this.http
      .request<TRes>('get', url, options)
      .pipe(
        catchError((res) =>
          throwError(() => res?.error?.message || this.defaultErrorMessage)
        )
      );
  }

  protected post<TReq, TRes>(
    apiUri: string,
    body: TReq,
    params?: HttpParams
  ): Observable<TRes> {
    const url = this.baseApiUrl + apiUri;
    const options = {
      body,
      params,
    };
    return this.http
      .request<TRes>('post', url, options)
      .pipe(
        catchError((res) =>
          throwError(() => res?.error?.message || this.defaultErrorMessage)
        )
      );
  }

  protected throwNotIn<T>(codes: Array<BaseAPICodes>, res: BaseAPIResModel<T>) {
    const { code, message } = res;

    if (!codes.includes(code)) {
      return throwError(() => message);
    }
    return of(res);
  }
}
