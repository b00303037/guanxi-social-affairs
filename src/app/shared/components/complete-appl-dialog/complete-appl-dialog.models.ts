import { AbstractControl } from '@angular/forms';
import { YN } from '../../enums/yn.enum';

export interface CompleteApplDialogData {
  applicationID: string;
  completionDate?: string;
  hasCancer?: YN;
}

export interface CompleteApplFormModel {
  completionDate: Date;
  hasCancer: YN;
}
export interface CompleteApplFCsModel {
  completionDate: AbstractControl;
  hasCancer: AbstractControl;
}

export type CompleteApplDialogResult = boolean | undefined;
