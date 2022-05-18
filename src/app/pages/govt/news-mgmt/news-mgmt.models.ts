import { AbstractControl } from '@angular/forms';

export interface NewsMgmtFilterFormModel {
  startDate: Date | null;
  endDate: Date | null;
  keyword: string;
}
export interface NewsMgmtFilterFCsModel {
  startDate: AbstractControl;
  endDate: AbstractControl;
  keyword: AbstractControl;
}
