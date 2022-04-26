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
  constructor(private gsaService: GsaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): HomeData | Observable<HomeData> {
    return this.gsaService.GetHomeData().pipe(
      map((res) => {
        return res.content;
      }),
      catchError((err) => {
        return of({
          newsList: [],
          applCount: 0,
          hospCount: 0,
        });
      })
    );
  }
}
