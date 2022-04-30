import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { APPL_STATUS_MAP } from 'src/app/shared/enums/appl-status.enum';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';
import {
  DETAIL_PROPERTY_LIST,
  ExtendedAppl,
  IMG_PROPERTY_LIST,
} from 'src/app/api/models/get-appl.models';

@Component({
  selector: 'app-expanded-appl',
  templateUrl: './expanded-appl.component.html',
  styleUrls: ['./expanded-appl.component.scss'],
})
export class ExpandedApplComponent implements OnInit, OnDestroy {
  private _gtMDQueryListener = () => this.changeDetectorRef.detectChanges();

  @Input() appl!: ApplInList;
  @Input() expandedAppl: ExtendedAppl | null = null;

  gtMDQuery: MediaQueryList = this.media.matchMedia('(min-width: 960px)');

  detailPropertyList = DETAIL_PROPERTY_LIST;
  imgPropertyList = IMG_PROPERTY_LIST;

  applStatusMap = APPL_STATUS_MAP;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.gtMDQuery.addEventListener('change', this._gtMDQueryListener);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.gtMDQuery.removeEventListener('change', this._gtMDQueryListener);
  }
}
