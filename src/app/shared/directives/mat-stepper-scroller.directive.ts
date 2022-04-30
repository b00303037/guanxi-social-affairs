import { Directive, HostListener } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Directive({
  selector: '[appMatStepperScroller]',
})
export class MatStepperScrollerDirective {
  constructor(private stepper: MatStepper) {}

  @HostListener('animationDone', ['$event'])
  onAnimationDone() {
    const stepLabelId = this.stepper._getStepLabelId(
      this.stepper.selectedIndex
    );
    const stepLabelEle = document.getElementById(stepLabelId);

    if (stepLabelEle) {
      stepLabelEle.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  }
}
