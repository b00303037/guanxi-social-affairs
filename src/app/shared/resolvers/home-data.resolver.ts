import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { GsaService } from 'src/app/api/gsa.service';
import { HomeData } from 'src/app/api/models/get-home-data.models';

@Injectable({
  providedIn: 'root',
})
export class HomeDataResolver implements Resolve<HomeData> {
  private _homeDataCache: HomeData | undefined;

  constructor(private gsaService: GsaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): HomeData | Observable<HomeData> {
    return (
      this._homeDataCache ??
      this.gsaService.GetHomeData().pipe(
        map((res) => {
          this._homeDataCache = res.content;

          return res.content;
        }),
        catchError((err) => {
          return of({
            newsList: [],
            applCount: 0,
            applCountToday: 0,
            hospCount: 0,
          });
        })
      )
    );
  }
}
