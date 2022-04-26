import { AbstractControl, ValidationErrors } from '@angular/forms';
import { asValid, isEmpty } from './validator-utils';

export function IDNoValidator(
  control: AbstractControl
): ValidationErrors | null {
  const IDNo: string | null = control.value;

  if (isEmpty(IDNo) || asValid(control)) {
    return null;
  }

  if (IDNoRegExp.test(IDNo as string)) {
    const code: string = (IDNo as string)[0].toUpperCase();
    const digits: Array<number> = (
      IDNoCodesMapping[code] + (IDNo as string).substring(1)
    )
      .split('')
      .map((n) => +n);
    const sum: number = digits.reduce<number>(
      (sum, n, i) => (sum += n * weightages[i]),
      0
    );

    if (sum % 10 == 0) {
      return null;
    }
  }

  return { IDNo: true };
}

const IDNoRegExp: RegExp = /^[a-zA-Z]{1}[1-2]{1}[0-9]{8}$/;

const IDNoCodesMapping: { [key: string]: string } = {
  A: '10', // 臺北市
  B: '11', // 臺中市
  C: '12', // 基隆市
  D: '13', // 臺南市
  E: '14', // 高雄市
  F: '15', // 新北市
  G: '16', // 宜蘭縣
  H: '17', // 桃園市
  I: '34', // 嘉義市
  J: '18', // 新竹縣
  K: '19', // 苗栗縣
  L: '20', // 台中縣
  M: '21', // 南投縣
  N: '22', // 彰化縣
  O: '35', // 新竹市
  P: '23', // 雲林縣
  Q: '24', // 嘉義縣
  R: '25', // 台南縣
  S: '26', // 高雄縣
  T: '27', // 屏東縣
  U: '28', // 花蓮縣
  V: '29', // 台東縣
  W: '32', // 金門縣
  X: '30', // 澎湖縣
  Y: '31', // 陽明山管理局
  Z: '33', // 連江縣
};
const weightages: Array<number> = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
