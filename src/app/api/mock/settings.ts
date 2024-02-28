import { Settings } from '../models/get-settings.models';

export const SETTINGS: Settings = {
  IDNoSuffixList: ['', '13579', '02468', '13579', '02468', '13579', '02468'],
  maxRegDate: '2022/03/01',
  applIntervalYears: '2',
  maxImgSizeMB: '0.25',
  launchDatetime: '2024-02-23T01:00:00.000Z',
  closeDatetime: '2024-10-31T08:00:00.000Z',
  dailyApplLimit: '30',
  yearlyApplLimit: '1000',
  minApplAge: '40',
  applUnavailableWeekdayOrDateList: ['SUN','SAT'],
  applAvailableDateList: [],
  applAvailableHourList: ['9', '10', '11', '12', '13', '14', '15'],
};
