import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/api/models/user.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private jwtHelperService: JwtHelperService) {}

  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  setToken(token: string): void {
    try {
      const user = this.jwtHelperService.decodeToken(token) as User;

      this.user$.next(user);

      localStorage.setItem(environment.tokenKey, token);
    } catch (err) {
      console.error(err);

      throw '很抱歉，發生未預期的錯誤，請稍後再試一次';
    }
  }

  removeToken(): void {
    localStorage.removeItem(environment.tokenKey);

    this.user$.next(undefined);
  }
}
