import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, throwError, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseApiService } from './base-api.service';
import { APPL_LIST } from './fake/appl-list';
import { HOME_DATA } from './fake/home-data';
import { HOSP_DATA } from './fake/hosp-data';
import { NEWS_LIST } from './fake/news-list';
import { SETTINGS } from './fake/settings';
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
import { VerifyReq, VerifyRes } from './models/verify.models';
import { BaseAPICodes } from '../shared/enums/base-api-codes.enum';
import { TOKENS } from './fake/tokens';
import { AuthService } from '../shared/services/auth.service';
import { User } from './models/user.models';
import { ApplStatuses } from '../shared/enums/appl-status.enum';
import { YN } from '../shared/enums/yn.enum';

@Injectable({
  providedIn: 'root',
})
export class GsaService extends BaseApiService {
  private baseRoute = '';
  private shortLatencyMS = 300;
  private longLatencyMS = 600;

  constructor(
    protected override http: HttpClient,
    private authService: AuthService
  ) {
    super(http);
  }

  /**
   * 取得首頁資料
   */
  GetHomeData(): Observable<GetHomeDataRes> {
    const apiUri = this.baseRoute + '/GetHomeData';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
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
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<null, GetHomeDataRes>(apiUri, null)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 取得醫院資料
   */
  GetHospData(): Observable<GetHospDataRes> {
    const apiUri = this.baseRoute + '/GetHospData';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
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
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<null, GetHospDataRes>(apiUri, null)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 取得字典檔設定
   */
  GetSettings(): Observable<GetSettingsRes> {
    const apiUri = this.baseRoute + '/GetSettings';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
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
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<null, GetSettingsRes>(apiUri, null)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 身分認證
   */
  Verify(req: VerifyReq): Observable<VerifyRes> {
    const apiUri = this.baseRoute + '/Verify';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      const content = {
        token: TOKENS.appl,
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
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<VerifyReq, VerifyRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 新增申請單
   */
  AddAppl(req: AddApplReq): Observable<AddApplRes> {
    const apiUri = this.baseRoute + '/AddAppl';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('AddAppl');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '新增申請單成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<AddApplReq, AddApplRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 更新申請單
   */
  UpdateAppl(req: UpdateApplReq): Observable<UpdateApplRes> {
    const apiUri = this.baseRoute + '/UpdateAppl';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('UpdateAppl');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '更新申請單成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<UpdateApplReq, UpdateApplRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 取消申請單
   */
  CancelAppl(req: CancelApplReq): Observable<CancelApplRes> {
    const apiUri = this.baseRoute + '/CancelAppl';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('CancelAppl');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '取消申請單成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<CancelApplReq, CancelApplRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 社會課/醫院帳戶登入
   */
  Login(req: LoginReq): Observable<LoginRes> {
    const apiUri = this.baseRoute + '/Login';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
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
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<LoginReq, LoginRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 取得申請單列表
   */
  GetApplList(req: GetApplListReq): Observable<GetApplListRes> {
    const apiUri = this.baseRoute + '/GetApplList';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      let content: Array<Appl> = [];

      const user = this.authService.user$.getValue() as User;

      console.log('---');
      console.log('check user role');
      console.log(user);

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
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<GetApplListReq, GetApplListRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 取得一筆申請單
   */
  GetAppl(req: GetApplReq): Observable<GetApplRes> {
    const apiUri = this.baseRoute + '/GetAppl';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      const content = APPL_LIST.find(
        (a) => a.applicationID === req.applicationID
      );

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
              content,
            })),
            switchMap((res) => super.throwNotIn(acceptedCodes, res))
          )
        : throwError(() => '取無資料');
    }

    return super
      .post<GetApplReq, GetApplRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 審核申請單
   */
  ReviewAppl(req: ReviewApplReq): Observable<ReviewApplRes> {
    const apiUri = this.baseRoute + '/ReviewAppl';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('ReviewAppl');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '審核申請單成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<ReviewApplReq, ReviewApplRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 安排健檢
   */
  ArrangeAppl(req: ArrangeApplReq): Observable<ArrangeApplRes> {
    const apiUri = this.baseRoute + '/ArrangeAppl';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('ArrangeAppl');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '安排健檢成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<ArrangeApplReq, ArrangeApplRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 完成健檢
   */
  CompleteAppl(req: CompleteApplReq): Observable<CompleteApplRes> {
    const apiUri = this.baseRoute + '/CompleteAppl';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('CompleteAppl');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '完成健檢成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<CompleteApplReq, CompleteApplRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 取得最新消息列表
   */
  GetNewsList(req: GetNewsListReq): Observable<GetNewsListRes> {
    const apiUri = this.baseRoute + '/GetNewsList';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      let content: Array<News> = [];

      const user = this.authService.user$.getValue() as User;

      console.log('---');
      console.log('check user role');
      console.log(user);

      switch (user.role) {
        case 'govt':
          content = NEWS_LIST;
          break;
        default:
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
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<GetNewsListReq, GetNewsListRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 取得一筆最新消息
   */
  GetNews(req: GetNewsReq): Observable<GetNewsRes> {
    const apiUri = this.baseRoute + '/GetNews';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
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
            })),
            switchMap((res) => super.throwNotIn(acceptedCodes, res))
          )
        : throwError(() => '取無資料');
    }

    return super
      .post<GetNewsReq, GetNewsRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 新增最新消息
   */
  AddNews(req: AddNewsReq): Observable<AddNewsRes> {
    const apiUri = this.baseRoute + '/AddNews';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('AddNews');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '新增最新消息成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<AddNewsReq, AddNewsRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 更新最新消息
   */
  UpdateNews(req: UpdateNewsReq): Observable<UpdateNewsRes> {
    const apiUri = this.baseRoute + '/UpdateNews';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('UpdateNews');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '更新最新消息成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<UpdateNewsReq, UpdateNewsRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 新增健檢項目
   */
  AddHCProgram(req: AddHCProgramReq): Observable<AddHCProgramRes> {
    const apiUri = this.baseRoute + '/AddHCProgram';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('AddHCProgram');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '新增健檢項目成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<AddHCProgramReq, AddHCProgramRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 更新健檢項目
   */
  UpdateHCProgram(req: UpdateHCProgramReq): Observable<UpdateHCProgramRes> {
    const apiUri = this.baseRoute + '/UpdateHCProgram';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('UpdateHCProgram');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '更新健檢項目成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<UpdateHCProgramReq, UpdateHCProgramRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 批次發送自訂通知
   */
  BatchNotify(req: BatchNotifyReq): Observable<BatchNotifyRes> {
    const apiUri = this.baseRoute + '/BatchNotify';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    if (environment.fakeData) {
      console.log('---');
      console.log('BatchNotify');
      console.log(req);

      return timer(this.shortLatencyMS).pipe(
        map(() => ({
          success: true,
          code: BaseAPICodes.SUCCESS,
          message: '批次發送自訂通知成功',
          content: null,
        })),
        switchMap((res) => super.throwNotIn(acceptedCodes, res))
      );
    }

    return super
      .post<BatchNotifyReq, BatchNotifyRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }
}
