import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { GsaService } from 'src/app/api/gsa.service';
import { GetNewsReq, News } from 'src/app/api/models/get-news.models';
import { SnackTypes } from 'src/app/shared/enums/snack-type.enum';
import { Snack } from 'src/app/shared/services/snack-bar.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  news: News | undefined;

  getting = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private gsaService: GsaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '0';
    const newsID = Number.parseInt(id, 10);

    this.onGetNews(newsID);
  }

  onGetNews(newsID: number): void {
    if (this.getting) {
      return;
    }
    if (Number.isNaN(newsID)) {
      this.router.navigate(['/news-list']);
    }
    this.getting = true;

    const req: GetNewsReq = {
      newsID,
    };

    this.gsaService
      .GetNews(req)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.getting = false)),
        map((res) => {
          this.news = res.content;
        }),
        catchError((err) => this.onError(err))
      )
      .subscribe();
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
