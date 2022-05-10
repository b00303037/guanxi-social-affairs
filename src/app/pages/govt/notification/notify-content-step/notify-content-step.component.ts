import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContentFCsModel } from '../notification.models';

@Component({
  selector: 'app-notify-content-step',
  templateUrl: './notify-content-step.component.html',
  styleUrls: ['./notify-content-step.component.scss'],
})
export class NotifyContentStepComponent implements OnInit {
  @Input() fg!: FormGroup;
  fcs!: ContentFCsModel;

  constructor() {}

  ngOnInit(): void {
    this.initFCs();
  }

  initFCs(): void {
    this.fcs = {
      subject: this.fg.controls['subject'],
      body: this.fg.controls['body'],
      passed: this.fg.controls['passed'],
    };
  }
}
