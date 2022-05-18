import { SnackTypes } from '../enums/snack-type.enum';

export class Snack {
  // seq?: number;
  message: string = '';
  type: SnackTypes = SnackTypes.Default;

  constructor(data: { message: string; type?: SnackTypes }) {
    this.message = data.message ?? this.message;
    this.type = data.type ?? this.type;
  }
}
