import { AbstractControl } from '@angular/forms';

export interface ArrangeApplDialogData {
  applicationID: string;
  scheduledDate?: string;
}

export interface ArrangeApplFormModel {
  scheduledDate: Date;
}
export interface ArrangeApplFCsModel {
  scheduledDate: AbstractControl;
}

export type ArrangeApplDialogResult = boolean | undefined;
