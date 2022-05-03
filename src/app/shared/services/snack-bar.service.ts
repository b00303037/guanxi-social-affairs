import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, tap } from 'rxjs';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { SnackBarData } from '../components/snack-bar/snack-bar.models';
import { Snack } from './snack-bar.models';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackSource$ = new EventEmitter<void>();
  private snackQueue: Array<Snack> = [];
  private intervalMS = 2000;
  private pending = false;
  private timestamp: number | undefined;

  private seq = 1;

  constructor(private matSnackBar: MatSnackBar) {
    this.snackSource$
      .pipe(
        filter(() => this.snackQueue.length !== 0 && !this.pending),
        tap(() => {
          const newTimestamp = new Date().valueOf();

          if (
            this.timestamp === undefined ||
            newTimestamp - this.timestamp > this.intervalMS
          ) {
            const snack = this.snackQueue.shift();

            if (snack) {
              this.timestamp = new Date().valueOf();

              console.log(`${snack?.seq}: snack taken`, [...this.snackQueue]);

              const data: SnackBarData = snack;

              console.log(`${snack.seq}: open snackBar`);
              console.time(`${snack.seq}`);

              this.matSnackBar
                .openFromComponent(SnackBarComponent, {
                  data,
                  panelClass: data.type ?? undefined,
                })
                .afterDismissed()
                .subscribe(() => {
                  console.log(`${snack.seq}: snackBar dismissed`);
                  console.timeEnd(`${snack.seq}`);

                  this.snackSource$.next();
                });
            }
          } else {
            const diff = newTimestamp - this.timestamp;

            console.log(`pending for ${this.intervalMS - diff} ms`);

            this.pending = true;

            setTimeout(() => {
              this.pending = false;

              this.snackSource$.next();
            }, this.intervalMS - diff);
          }
        })
      )
      .subscribe();
  }

  add(snack: Snack): void {
    snack.seq = this.seq;
    this.seq++;

    this.snackQueue.push(snack);

    console.log(`${snack.seq}: snack added`, [...this.snackQueue]);

    this.snackSource$.next();
  }
}
