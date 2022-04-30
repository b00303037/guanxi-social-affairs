import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil, tap, throttleTime } from 'rxjs';

@Directive({
  selector: '[appSubmitThrottle]',
})
export class SubmitThrottleDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() submitThrottleTime = 1000;
  @Output() submitThrottle = new EventEmitter<Event>();

  eventSource$ = new Subject<Event>();

  constructor() {}

  ngOnInit(): void {
    this.eventSource$
      .pipe(
        takeUntil(this.destroy$),
        throttleTime(this.submitThrottleTime),
        tap((event) => this.submitThrottle.next(event))
      )
      .subscribe();
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    event.preventDefault();

    this.eventSource$.next(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
