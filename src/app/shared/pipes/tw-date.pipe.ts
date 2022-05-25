import { Pipe, PipeTransform } from '@angular/core';
import { getDate, getMonth, getYear, isValid } from 'date-fns';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';

// TODO not used
@Pipe({
  name: 'TWDate',
})
export class TWDatePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): string | null {
    const date =
      typeof value === 'string' || typeof value === 'number'
        ? new Date(value)
        : value;

    if (isValid(date)) {
      return `${getYear(date as Date) - 1911} 年 ${
        getMonth(date as Date) + 1
      } 月 ${getDate(date as Date)} 日`;
    }

    return null;
  }
}
