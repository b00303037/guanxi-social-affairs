import { AbstractControl } from '@angular/forms';

export interface NewsListFilterFormModel {
  startDate: Date | null;
  endDate: Date | null;
  keyword: string;
}
export interface NewsListFilterFCsModel {
  startDate: AbstractControl;
  endDate: AbstractControl;
  keyword: AbstractControl;
}
