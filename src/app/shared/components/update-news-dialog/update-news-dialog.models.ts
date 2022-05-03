import { AbstractControl } from '@angular/forms';
import { YN } from '../../enums/yn.enum';

export interface UpdateNewsDialogData {
  newsID: number;
}

export interface UpdateNewsFormModel {
  title: string;
  date: Date;
  content: string;
  enabled: YN;
  pinned: YN;
  startDate?: Date;
  startHours?: number;
  startMinutes?: number;
  endDate?: Date;
  endHours?: number;
  endMinutes?: number;
}
export interface UpdateNewsFCsModel {
  title: AbstractControl;
  date: AbstractControl;
  content: AbstractControl;
  enabled: AbstractControl;
  pinned: AbstractControl;
  startDate: AbstractControl;
  startHours: AbstractControl;
  startMinutes: AbstractControl;
  endDate: AbstractControl;
  endHours: AbstractControl;
  endMinutes: AbstractControl;
}

export type UpdateNewsDialogResult = boolean | undefined;
