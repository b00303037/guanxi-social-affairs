import { AbstractControl } from '@angular/forms';
import { HospDataHCProgram } from 'src/app/api/models/get-hosp-data.models';
import { YN } from '../../enums/yn.enum';

export interface AddHCProgramFormModel {
  name: string;
  description: string;
  charge: number;
  enabled: YN;
}
export interface AddHCProgramFCsModel {
  name: AbstractControl;
  description: AbstractControl;
  charge: AbstractControl;
  enabled: AbstractControl;
}

export type AddHCProgramDialogResult = boolean | undefined;
