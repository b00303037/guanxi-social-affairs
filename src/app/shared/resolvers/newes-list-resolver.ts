import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AbstractGsaService } from 'src/app/api/models/abstract-gsa.service';
import { NewsInList } from 'src/app/api/models/get-news-list.models';

@Injectable({
  providedIn: 'root',
})
export class NewsListResolver implements Resolve<Array<NewsInList>> {
  private _newsListCache: Array<NewsInList> | undefined;

  constructor(private gsaService: AbstractGsaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Array<NewsInList> | Observable<Array<NewsInList>> {
    return (
      this._newsListCache ??
      this.gsaService.GetNewsList({}).pipe(
        map((res) => {
          this._newsListCache = res.content;

          return res.content;
        }),
        catchError((err) => {
          return of([]);
        })
      )
    );
  }
}
