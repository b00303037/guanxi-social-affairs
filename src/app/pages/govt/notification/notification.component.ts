import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { AbstractGsaService } from 'src/app/api/models/abstract-gsa.service';
import { BatchNotifyReq } from 'src/app/api/models/batch-notify.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import {
  ContentFCsModel,
  ContentFormModel,
  ReceiverFCsModel,
  ReceiverFormModel,
} from './notification.models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();
  private _gtMDQueryListener = () => this.changeDetectorRef.detectChanges();

  gtMDQuery: MediaQueryList = this.media.matchMedia('(min-width: 960px)');

  @ViewChild(MatStepper) stepper!: MatStepper;

  flagsOfEditable = {
    receiver: true,
    content: true,
  };

  receiverFG = new FormGroup({
    receiverType: new FormControl(null, [Validators.required]),
    applStatusList: new FormControl(
      {
        value: null,
        disabled: true,
      },
      [Validators.required]
    ),
    applIDList: new FormControl(
      {
        value: null,
        disabled: true,
      },
      [Validators.required]
    ),
  });
  receiverFCs: ReceiverFCsModel = {
    receiverType: this.receiverFG.controls['receiverType'],
    applStatusList: this.receiverFG.controls['applStatusList'],
    applIDList: this.receiverFG.controls['applIDList'],
  };
  get receiverFV(): ReceiverFormModel {
    return this.receiverFG.value;
  }

  contentFG = new FormGroup({
    subject: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    body: new FormControl(null, [
      Validators.required,
      Validators.maxLength(70),
    ]),
    passed: new FormControl(null, [Validators.requiredTrue]),
  });
  contentFCs: ContentFCsModel = {
    subject: this.contentFG.controls['subject'],
    body: this.contentFG.controls['body'],
    passed: this.contentFG.controls['passed'],
  };
  get contentFV(): ContentFormModel {
    return this.contentFG.value;
  }

  notifying = false;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBarService: SnackBarService,
    private gsaService: AbstractGsaService
  ) {
    this.gtMDQuery.addEventListener('change', this._gtMDQueryListener);
  }

  ngOnInit(): void {}

  onReceiverFormSubmit(e: Event): void {
    e.preventDefault();

    this.forceValidation(this.receiverFG);

    this.stepper.next();
  }

  onContentFormSubmit(e: Event): void {
    e.preventDefault();

    this.forceValidation(this.contentFG);

    if (this.notifying || !this.checkFG(this.contentFG, ['passed'])) {
      return;
    }
    this.notifying = true;

    const { receiverType, applStatusList, applIDList } = this.receiverFV;
    const { subject, body } = this.contentFV;
    const req: BatchNotifyReq = {
      type: receiverType,
      applStatusList,
      applIDList,
      subject,
      body,
    };

    this.gsaService
      .BatchNotify(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.notifying = false)),
        map((res) => {
          const snack = new Snack({
            message: res.message,
            type: SnackTypes.Success,
          });
          this.snackBarService.add(snack);

          this.contentFCs['passed'].setValue(true);

          this.flagsOfEditable.receiver = false;
          this.flagsOfEditable.content = false;

          this.stepper.next();
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
  }

  reset(): void {
    this.flagsOfEditable.receiver = true;
    this.flagsOfEditable.content = true;

    this.stepper.reset();
  }

  forceValidation(fg: FormGroup): void {
    fg.markAllAsTouched();
    fg.updateValueAndValidity();
  }

  checkFG(fg: FormGroup, skippedFCNames: Array<string> = []): boolean {
    return (
      fg.errors === null &&
      Object.entries(fg.controls)
        .filter(([name, fc]) => !skippedFCNames.includes(name))
        .every(([name, fc]) => fc.errors === null)
    );
  }

  onError(err: string): Observable<never> {
    const snack = new Snack({ message: err, type: SnackTypes.Error });
    this.snackBarService.add(snack);

    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
