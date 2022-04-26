import { YN } from '../enums/yn.enum';
import { HCProgram } from '../models/get-hcprogram-list.models';

export const HCPROGRAM_LIST: Array<HCProgram> = [
  {
    programID: 1,
    name: 'name 1-1',
    description: 'description 1-1',
    charge: 1000,
    enabled: YN.Y,
    hospitalID: 1,
  },
  {
    programID: 2,
    name: 'name 1-2',
    description: 'description 1-2',
    charge: 2000,
    enabled: YN.Y,
    hospitalID: 1,
  },
  {
    programID: 3,
    name: 'name 1-3',
    description: 'description 1-3',
    charge: 3000,
    enabled: YN.Y,
    hospitalID: 1,
  },
];
