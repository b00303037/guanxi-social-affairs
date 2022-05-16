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
  @Input() maxImgSizeMB!: number;
  fcs!: IDPhotosFCsModel;

  uploading = false;
  uploadingFCName:
    | 'imgIDA'
    | 'imgIDB'
    | 'imgBankbook'
    | 'imgRegTranscript'
    | undefined = undefined;

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

  handleImageUpload(
    event: Event,
    fcName: 'imgIDA' | 'imgIDB' | 'imgBankbook' | 'imgRegTranscript'
  ): void {
    const target = event.target as HTMLInputElement;

    if (this.uploading || target.files === null || target.files.length === 0) {
      return;
    }
    this.uploading = true;
    this.uploadingFCName = fcName;

    const image = target.files[0];
    const options = {
      maxSizeMB: this.maxImgSizeMB,
      useWebWorker: true,
    };

    from(imageCompression(image, options))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.uploading = false;
          this.uploadingFCName = undefined;
        }),
        tap(async (compressed) => {
          const encoded = await imageCompression.getDataUrlFromFile(compressed);

          this.fcs[fcName].setValue(encoded);
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
