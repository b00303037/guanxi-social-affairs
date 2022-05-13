import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  catchError,
  EMPTY,
  finalize,
  from,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { IDPhotosFCsModel } from '../update-appl-dialog.models';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-idphotos-form',
  templateUrl: './idphotos-form.component.html',
  styleUrls: ['./idphotos-form.component.scss'],
})
export class IDPhotosFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  @Input() fg!: FormGroup;
  fcs!: IDPhotosFCsModel;

  maxImgSizeMB = Number.POSITIVE_INFINITY;

  uploading = false;

  ngOnInit(): void {
    this.initFCs();
  }

  initFCs(): void {
    this.fcs = {
      imgIDA: this.fg.controls['imgIDA'],
      imgIDB: this.fg.controls['imgIDB'],
      imgBankbook: this.fg.controls['imgBankbook'],
      imgRegTranscript: this.fg.controls['imgRegTranscript'],
    };
  }

  handleImageUpload(event: Event, fc: AbstractControl): void {
    const target = event.target as HTMLInputElement;

    if (this.uploading || target.files === null || target.files.length === 0) {
      return;
    }
    this.uploading = true;

    const image = target.files[0];
    const options = {
      maxSizeMB: this.maxImgSizeMB,
      useWebWorker: true,
    };

    from(imageCompression(image, options))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.uploading = false)),
        tap(async (compressed) => {
          const encoded = await imageCompression.getDataUrlFromFile(compressed);

          fc.setValue(encoded);
        }),
        catchError((err) => {
          console.error(err);

          return EMPTY;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
