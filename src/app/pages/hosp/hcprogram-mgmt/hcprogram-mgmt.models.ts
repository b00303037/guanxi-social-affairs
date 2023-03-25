import { AbstractControl } from '@angular/forms';

export interface HcprogramListFilterFormModel {
  yearList: Array<number>;
  keyword: string;
}
export interface HcprogramListFilterFCsModel {
  yearList: AbstractControl;
  keyword: AbstractControl;
}
