import { Settings } from '../models/get-settings.models';

export const SETTINGS: Settings = {
  IDNoSuffixList: ['', '13579', '02468', '13579', '02468', '13579', '02468'],
  maxRegDate: '2019/05/01',
  applIntervalYears: '3',
  maxImgSizeMB: '0.25',
  launchDatetime: '2022-05-01T01:00:00.000Z',
  dailyApplLimit: '30',
  yearlyApplLimit: '1500',
  minApplAge: '45',
  applUnavailableWeekdayOrDateList: ['SUN'],
  applAvailableDateList: ['2022/06/01'],
  applAvailableHourList: ['9', '10', '11', '12', '13', '14', '15', '16'],
};
