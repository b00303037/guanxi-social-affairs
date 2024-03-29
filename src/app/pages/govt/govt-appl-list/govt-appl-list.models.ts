import { AbstractControl } from '@angular/forms';
import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';

export interface GovtApplListFilterFormModel {
  applStatusList: Array<ApplStatuses>;
  hospitalIDList: Array<number>;
  yyyyList: Array<string>;
  keyword: string;
}
export interface GovtApplListFilterFCsModel {
  applStatusList: AbstractControl;
  hospitalIDList: AbstractControl;
  yyyyList: AbstractControl;
  keyword: AbstractControl;
}
