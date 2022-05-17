import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from 'src/app/api/models/user.models';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GovtGuard implements CanLoad {
  constructor(
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private authService: AuthService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authService.getToken();

    if (typeof token !== 'string' || token.length === 0) {
      this.router.navigate(['/home']);
      return false;
    }

    try {
      const user = this.jwtHelperService.decodeToken(token) as User;

      if (user.role !== 'govt') {
        this.router.navigate(['/home']);
        return false;
      }

      this.authService.user$.next(user);
    } catch (err) {
      console.error(err);

      this.authService.removeToken();

      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
