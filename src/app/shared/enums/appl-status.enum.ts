export enum ApplStatuses {
  /**
   * 待審核
   */
  Unreviewed = 'U',
  /**
   * 已取消
   */
  X = 'X',
  /**
   * 審核通過
   */
  Y = 'Y',
  /**
   * 待補正
   */
  N = 'N',
  /**
   * 已安排健檢
   */
  Arranged = 'A',
  /**
   * 已完成健檢
   */
  Completed = 'C',
}
export const APPL_STATUS_OBJ = {
  Unreviewed: ApplStatuses.Unreviewed,
  X: ApplStatuses.X,
  Y: ApplStatuses.Y,
  N: ApplStatuses.N,
  Arranged: ApplStatuses.Arranged,
  Completed: ApplStatuses.Completed,
};
export const APPL_STATUS_MAP = {
  [ApplStatuses.Unreviewed]: '待審核',
  [ApplStatuses.X]: '已取消',
  [ApplStatuses.Y]: '審核通過',
  [ApplStatuses.N]: '待補正',
  [ApplStatuses.Arranged]: '已安排健檢',
  [ApplStatuses.Completed]: '已完成健檢',
};
export const GOVT_APPL_STATUS_SELECT_LIST: Array<{
  label: string;
  value: ApplStatuses;
}> = [
  {
    label: APPL_STATUS_MAP[ApplStatuses.Unreviewed],
    value: ApplStatuses.Unreviewed,
  },
  {
    label: APPL_STATUS_MAP[ApplStatuses.X],
    value: ApplStatuses.X,
  },
  {
    label: APPL_STATUS_MAP[ApplStatuses.Y],
    value: ApplStatuses.Y,
  },
  {
    label: APPL_STATUS_MAP[ApplStatuses.N],
    value: ApplStatuses.N,
  },
  {
    label: APPL_STATUS_MAP[ApplStatuses.Arranged],
    value: ApplStatuses.Arranged,
  },
  {
    label: APPL_STATUS_MAP[ApplStatuses.Completed],
    value: ApplStatuses.Completed,
  },
];
export const HOSP_APPL_STATUS_SELECT_LIST: Array<{
  label: string;
  value: ApplStatuses;
}> = [
  {
    label: APPL_STATUS_MAP[ApplStatuses.Y],
    value: ApplStatuses.Y,
  },
  {
    label: APPL_STATUS_MAP[ApplStatuses.Arranged],
    value: ApplStatuses.Arranged,
  },
  {
    label: APPL_STATUS_MAP[ApplStatuses.Completed],
    value: ApplStatuses.Completed,
  },
];
