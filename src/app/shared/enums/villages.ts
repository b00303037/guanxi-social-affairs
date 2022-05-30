export const VILLAGES: Array<string> = [
  '北斗里',
  '北山里',
  '西安里',
  '南山里',
  '東光里',
  '東安里',
  '東山里',
  '仁安里',
  '玉山里',
  '新富里',
  '錦山里',
  '金山里',
  '東平里',
  '石光里',
  '大同里',
  '南雄里',
  '南新里',
  '新力裡',
  '南和里',
  '上林里',
  '東興里',
];
export const VILLAGE_SELECT_LIST: Array<{
  label: string;
  value: string;
}> = VILLAGES.map((v) => ({ label: v, value: v }));
