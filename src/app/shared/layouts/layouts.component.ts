import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import {
  LoginDialogData,
  LoginDialogResult,
} from '../components/login-dialog/login-dialog.models';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
})
export class LayoutsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  constructor(private router: Router, private matDialog: MatDialog) {}

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
          // TODO save token

          this.router.navigate([role]);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
