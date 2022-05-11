import { AbstractControl } from '@angular/forms';
import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';

export interface HospApplListFilterFormModel {
  applStatusList: Array<ApplStatuses>;
  keyword: string;
}
export interface HospApplListFilterFCsModel {
  applStatusList: AbstractControl;
  keyword: AbstractControl;
}
