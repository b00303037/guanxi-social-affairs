import { Settings } from '../models/get-settings.models';

export const SETTINGS: Settings = {
  IDNoSuffixList: [
    '0123456789',
    '13579',
    '02468',
    '13579',
    '02468',
    '13579',
    '02468',
  ],
  regDateMin: new Date('2019/05/01').toISOString(),
  applIntervalYears: 3,
};
