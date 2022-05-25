import { Injectable } from '@angular/core';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { format, parse, parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class TWDateFnsAdapter extends DateFnsAdapter {
  override getYearName(date: Date): string {
    const year = this.getYear(date);
    const beforeROC = year <= 1911;

    return `${year - (beforeROC ? 1912 : 1911)} 年`;
  }
}
