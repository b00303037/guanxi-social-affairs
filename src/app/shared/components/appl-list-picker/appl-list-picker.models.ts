import { AbstractControl } from '@angular/forms';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import { ApplStatuses } from '../../enums/appl-status.enum';

export interface ApplListPickerData {
  defaultPickedIDList: Array<string | undefined>;
}

export interface ApplListFilterFormModel {
  applStatusList: Array<ApplStatuses>;
  keyword: string;
}
export interface ApplListFilterFCsModel {
  applStatusList: AbstractControl;
  keyword: AbstractControl;
}

export type ApplListPickerResult = Array<ApplInList> | undefined;
