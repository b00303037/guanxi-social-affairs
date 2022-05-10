import { AbstractControl } from '@angular/forms';
import { ApplStatuses } from 'src/app/shared/enums/appl-status.enum';
import { ReceiverTypes } from 'src/app/shared/enums/receiver-types.enum';

export interface ReceiverFormModel {
  receiverType: ReceiverTypes;
  applStatusList: Array<ApplStatuses>;
  applIDList: Array<string>;
}
export interface ReceiverFCsModel {
  receiverType: AbstractControl;
  applStatusList: AbstractControl;
  applIDList: AbstractControl;
}

export interface ContentFormModel {
  subject: string;
  body: string;
  passed: boolean;
}
export interface ContentFCsModel {
  subject: AbstractControl;
  body: AbstractControl;
  passed: AbstractControl;
}
