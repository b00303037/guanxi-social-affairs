import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import {
  catchError,
  EMPTY,
  finalize,
  from,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-apply-idphotos-step',
  templateUrl: './apply-idphotos-step.component.html',
  styleUrls: ['./apply-idphotos-step.component.scss'],
})
export class ApplyIDPhotosStepComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  @Input() fcs!: { [key: string]: AbstractControl };

  uploading = false;

  constructor(private imageCompressService: NgxImageCompressService) {}

  ngOnInit(): void {}

  uploadPhoto(fc: AbstractControl): void {
    this.uploading = true;

    this.uploadAndCompress()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.uploading = false)),
        map((res) => {
          fc.setValue(res);
        }),
        catchError((res) => {
          if (typeof res === 'string') {
            fc.setValue(res);
          }

          return EMPTY;
        })
      )
      .subscribe();
  }

  uploadAndCompress(): Observable<string> {
    return from(
      this.imageCompressService.uploadAndGetImageWithMaxSize(1, true)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
