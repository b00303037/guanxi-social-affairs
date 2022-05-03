export interface IDNoHintDialogData {
  /**
   * 每日身分證字號尾碼限制
   */
  IDNoSuffixList: Array<string | undefined>;
}

export interface Hint {
  label: string;
  IDNoSuffix: string;
}
