export const VILLAGES: Array<string> = [
  '東安里',
  '北斗里',
  '西安里',
  '石光里',
  '東光里',
  '南山里',
  '仁安里',
  '錦山里',
  '東平里',
  '南新里',
  '南和里',
  '東山里',
  '上林里',
  '大同里',
  '北山里',
  '南雄里',
  '新富里',
  '金山里',
  '新力里',
  '東興里',
  '玉山里',
];
export const VILLAGE_SELECT_LIST: Array<{
  label: string;
  value: string;
}> = VILLAGES.map((v) => ({ label: v, value: v }));
