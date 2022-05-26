import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackTypes } from '../../enums/snack-type.enum';
import { SnackBarData } from './snack-bar.models';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  icon: 'error' | 'check_circle' | 'cancel' = 'error';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
    switch (this.data.type) {
      case SnackTypes.Success:
        this.icon = 'check_circle';
        break;
      case SnackTypes.Error:
        this.icon = 'cancel';
        break;
    }
  }

  ngOnInit(): void {}
}
