import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hint, IDNoHintDialogData } from './idno-hint-dialog.models';

@Component({
  selector: 'app-idno-hint-dialog',
  templateUrl: './idno-hint-dialog.component.html',
  styleUrls: ['./idno-hint-dialog.component.scss'],
})
export class IDNoHintDialogComponent implements OnInit {
  hintList: Array<Hint> = [
    '週日',
    '週一',
    '週二',
    '週三',
    '週四',
    '週五',
    '週六',
  ].map((label) => ({
    label,
    IDNoSuffix: '無限制',
  }));

  dayOfTheWeek: number = new Date().getDay();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDNoHintDialogData) {
    this.hintList = this.hintList.map((hint, i) => ({
      ...hint,
      IDNoSuffix:
        (this.data.IDNoSuffixList[i] ?? '').split('').join('、') || '無限制',
    }));
  }

  ngOnInit(): void {}
}
