import { Injectable } from '@angular/core';
import { map, Observable, throwError, timer } from 'rxjs';
import { ApplStatuses } from '../shared/enums/appl-status.enum';
import { BaseAPICodes } from '../shared/enums/base-api-codes.enum';
import { YN } from '../shared/enums/yn.enum';
import { AuthService } from '../shared/services/auth.service';
import { APPL_LIST } from './mock/appl-list';
import { HOME_DATA } from './mock/home-data';
import { HOSP_DATA } from './mock/hosp-data';
import { NEWS_LIST } from './mock/news-list';
import { SETTINGS } from './mock/settings';
import { TOKENS } from './mock/tokens';
import { AbstractGsaService } from './models/abstract-gsa.service';
import { AddApplReq, AddApplRes } from './models/add-appl.models';
import {
  AddHCProgramReq,
  AddHCProgramRes,
} from './models/add-hcprogram.models';
import { AddNewsReq, AddNewsRes } from './models/add-news.models';
import { ArrangeApplReq, ArrangeApplRes } from './models/arrange-appl.models';
import { BatchNotifyReq, BatchNotifyRes } from './models/batch-notify.models';
import { CancelApplReq, CancelApplRes } from './models/cancel-appl.models';
import {
  ChangePasswordReq,
  ChangePasswordRes,
} from './models/change-password.models';
import {
  CompleteApplReq,
  CompleteApplRes,
} from './models/complete-appl.models';
import { GetApplListReq, GetApplListRes } from './models/get-appl-list.models';
import { Appl, GetApplReq, GetApplRes } from './models/get-appl.models';
import { GetHomeDataRes } from './models/get-home-data.models';
import { GetHospDataRes } from './models/get-hosp-data.models';
import { GetNewsListReq, GetNewsListRes } from './models/get-news-list.models';
import { GetNewsReq, GetNewsRes, News } from './models/get-news.models';
import { GetSettingsRes } from './models/get-settings.models';
import { LoginReq, LoginRes } from './models/login.models';
import { ReviewApplReq, ReviewApplRes } from './models/review-appl.models';
import { UpdateApplReq, UpdateApplRes } from './models/update-appl.models';
import {
  UpdateHCProgramReq,
  UpdateHCProgramRes,
} from './models/update-hcprogram.models';
import { UpdateNewsReq, UpdateNewsRes } from './models/update-news.models';
import { User } from './models/user.models';
import { VerifyReq, VerifyRes } from './models/verify.models';

@Injectable({
  providedIn: 'root',
})
export class GsaMockService implements AbstractGsaService {
  private shortLatencyMS = 300;
  private longLatencyMS = 600;

  constructor(private authService: AuthService) {}

  /**
   * 取得首頁資料
   */
  GetHomeData(): Observable<GetHomeDataRes> {
    const content = HOME_DATA;

    console.log('---');
    console.log('GetHomeData');
    console.log(content);

    return timer(this.longLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '取得首頁資料成功',
        content,
      }))
    );
  }

  /**
   * 取得醫院資料
   */
  GetHospData(): Observable<GetHospDataRes> {
    const content = HOSP_DATA;

    console.log('---');
    console.log('GetHospData');
    console.log(content);

    return timer(this.longLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '取得醫院資料成功',
        content,
      }))
    );
  }

  /**
   * 取得字典檔設定
   */
  GetSettings(): Observable<GetSettingsRes> {
    const content = SETTINGS;

    console.log('---');
    console.log('GetSettings');
    console.log(content);

    return timer(this.longLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '取得字典檔設定成功',
        content,
      }))
    );
  }

  /**
   * 身分認證
   */
  Verify(req: VerifyReq): Observable<VerifyRes> {
    const content = {
      token: TOKENS.appl_U,
      hasApplied: false,
    };

    console.log('---');
    console.log('Verify');
    console.log(req);
    console.log(content);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '身分認證成功',
        content,
      }))
    );
  }

  /**
   * 新增申請單
   */
  AddAppl(req: AddApplReq): Observable<AddApplRes> {
    console.log('---');
    console.log('AddAppl');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '新增申請單成功',
        content: null,
      }))
    );
  }

  /**
   * 更新申請單
   */
  UpdateAppl(req: UpdateApplReq): Observable<UpdateApplRes> {
    console.log('---');
    console.log('UpdateAppl');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '更新申請單成功',
        content: null,
      }))
    );
  }

  /**
   * 取消申請單
   */
  CancelAppl(req: CancelApplReq): Observable<CancelApplRes> {
    console.log('---');
    console.log('CancelAppl');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '取消申請單成功',
        content: null,
      }))
    );
  }

  /**
   * 社會課/醫院帳戶登入
   */
  Login(req: LoginReq): Observable<LoginRes> {
    console.log('---');
    console.log('Login');
    console.log(req);

    const roleMapping = {
      govt: '社會課',
      hosp: '醫院',
    };

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: `${roleMapping[req.role]}帳戶登入成功`,
        content: {
          token: TOKENS[req.role],
        },
      }))
    );
  }

  /**
   * 取得申請單列表
   */
  GetApplList(req: GetApplListReq): Observable<GetApplListRes> {
    let content: Array<Appl> = [];

    const user = this.authService.user$.getValue() as User | undefined;

    console.log('---');
    console.log('check user role');
    console.log(user);

    if (user !== undefined) {
      switch (user.role) {
        case 'appl':
          content = APPL_LIST.filter((a) => a.IDNo === user.IDNo);
          break;
        case 'govt':
          content = APPL_LIST;
          break;
        case 'hosp':
          content = APPL_LIST.filter(
            (a) =>
              a.hospitalID === user.hospitalID &&
              [
                ApplStatuses.Y,
                ApplStatuses.Arranged,
                ApplStatuses.Completed,
              ].includes(a.status)
          );
          break;
      }
    }

    console.log('---');
    console.log('GetApplList');
    console.log(req);
    console.log(content);

    return timer(this.longLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '取得申請單列表成功',
        content,
      }))
    );
  }

  /**
   * 取得一筆申請單
   */
  GetAppl(req: GetApplReq): Observable<GetApplRes> {
    let content = APPL_LIST.find((a) => a.applicationID === req.applicationID);

    const user = this.authService.user$.getValue() as User | undefined;

    console.log('---');
    console.log('check user role');
    console.log(user);

    if (content !== undefined && user !== undefined) {
      switch (user.role) {
        case 'hosp':
          content = {
            ...content,
            imgIDA: '',
            imgIDB: '',
            imgBankbook: '',
            imgRegTranscript: '',
          };
          break;
      }
    } else {
      content = undefined;
    }

    console.log('---');
    console.log('GetAppl');
    console.log(req);
    console.log(content);

    return content
      ? timer(this.longLatencyMS).pipe(
          map(() => ({
            success: true,
            code: BaseAPICodes.SUCCESS,
            message: '取得一筆申請單成功',
            content: content as Appl,
          }))
        )
      : throwError(() => '取無資料');
  }

  /**
   * 審核申請單
   */
  ReviewAppl(req: ReviewApplReq): Observable<ReviewApplRes> {
    console.log('---');
    console.log('ReviewAppl');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '審核申請單成功',
        content: null,
      }))
    );
  }

  /**
   * 安排健檢
   */
  ArrangeAppl(req: ArrangeApplReq): Observable<ArrangeApplRes> {
    console.log('---');
    console.log('ArrangeAppl');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '安排健檢成功',
        content: null,
      }))
    );
  }

  /**
   * 完成健檢
   */
  CompleteAppl(req: CompleteApplReq): Observable<CompleteApplRes> {
    console.log('---');
    console.log('CompleteAppl');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '完成健檢成功',
        content: null,
      }))
    );
  }

  /**
   * 取得最新消息列表
   */
  GetNewsList(req: GetNewsListReq): Observable<GetNewsListRes> {
    let content: Array<News> = [];

    const user = this.authService.user$.getValue() as User | undefined;

    console.log('---');
    console.log('check user role');
    console.log(user);

    if (user !== undefined) {
      switch (user.role) {
        case 'govt':
          content = NEWS_LIST;
          break;
      }
    } else {
      content = NEWS_LIST.filter((n) => n.enabled === YN.Y);
    }

    console.log('---');
    console.log('GetNewsList');
    console.log(req);
    console.log(content);

    return timer(this.longLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '取得最新消息列表成功',
        content,
      }))
    );
  }

  /**
   * 取得一筆最新消息
   */
  GetNews(req: GetNewsReq): Observable<GetNewsRes> {
    const content = NEWS_LIST.find((a) => a.newsID === req.newsID);

    console.log('---');
    console.log('GetNews');
    console.log(req);
    console.log(content);

    return content
      ? timer(this.longLatencyMS).pipe(
          map(() => ({
            success: true,
            code: BaseAPICodes.SUCCESS,
            message: '取得一筆最新消息成功',
            content,
          }))
        )
      : throwError(() => '取無資料');
  }

  /**
   * 新增最新消息
   */
  AddNews(req: AddNewsReq): Observable<AddNewsRes> {
    console.log('---');
    console.log('AddNews');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '新增最新消息成功',
        content: null,
      }))
    );
  }

  /**
   * 更新最新消息
   */
  UpdateNews(req: UpdateNewsReq): Observable<UpdateNewsRes> {
    console.log('---');
    console.log('UpdateNews');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '更新最新消息成功',
        content: null,
      }))
    );
  }

  /**
   * 新增健檢項目
   */
  AddHCProgram(req: AddHCProgramReq): Observable<AddHCProgramRes> {
    console.log('---');
    console.log('AddHCProgram');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '新增健檢項目成功',
        content: null,
      }))
    );
  }

  /**
   * 更新健檢項目
   */
  UpdateHCProgram(req: UpdateHCProgramReq): Observable<UpdateHCProgramRes> {
    console.log('---');
    console.log('UpdateHCProgram');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '更新健檢項目成功',
        content: null,
      }))
    );
  }

  /**
   * 批次發送自訂通知
   */
  BatchNotify(req: BatchNotifyReq): Observable<BatchNotifyRes> {
    console.log('---');
    console.log('BatchNotify');
    console.log(req);

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: '批次發送自訂通知成功',
        content: null,
      }))
    );
  }

  /**
   * 社會課/醫院帳戶變更密碼
   */
  ChangePassword(req: ChangePasswordReq): Observable<ChangePasswordRes> {
    console.log('---');
    console.log('ChangePassword');
    console.log(req);

    const roleMapping = {
      govt: '社會課',
      hosp: '醫院',
    };

    return timer(this.shortLatencyMS).pipe(
      map(() => ({
        success: true,
        code: BaseAPICodes.SUCCESS,
        message: `${roleMapping[req.role]}帳戶變更密碼成功`,
        content: null,
      }))
    );
  }
}
