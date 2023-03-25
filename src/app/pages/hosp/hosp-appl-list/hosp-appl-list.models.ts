import { AbstractControl } from '@angular/forms';
import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';

export interface HospApplListFilterFormModel {
  applStatusList: Array<ApplStatuses>;
  yyyyList: Array<string>;
  keyword: string;
}
export interface HospApplListFilterFCsModel {
  applStatusList: AbstractControl;
  yyyyList: AbstractControl;
  keyword: AbstractControl;
}
