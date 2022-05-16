import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import {
  LoginDialogData,
  LoginDialogResult,
} from '../components/login-dialog/login-dialog.models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
})
export class LayoutsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  role$: Observable<'appl' | 'govt' | 'hosp' | undefined>;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.role$ = this.authService.user$.pipe(map((u) => u?.role));
  }

  ngOnInit(): void {}

  openLoginDialog(role: 'govt' | 'hosp'): void {
    const data: LoginDialogData = { role };

    this.matDialog
      .open(LoginDialogComponent, { data })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter<LoginDialogResult>((result) => result === true),
        tap(() => {
          this.router.navigate([role]);
        })
      )
      .subscribe();
  }

  logout(): void {
    this.authService.removeToken();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
