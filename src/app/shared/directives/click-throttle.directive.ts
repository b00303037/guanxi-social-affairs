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
  selector: '[appClickThrottle]',
})
export class ClickThrottleDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() clickThrottleTime = 1000;
  @Output() clickThrottle = new EventEmitter<Event>();

  eventSource$ = new Subject<Event>();

  constructor() {}

  ngOnInit(): void {
    this.eventSource$
      .pipe(
        takeUntil(this.destroy$),
        throttleTime(this.clickThrottleTime),
        tap((event) => this.clickThrottle.next(event))
      )
      .subscribe();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();

    this.eventSource$.next(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
