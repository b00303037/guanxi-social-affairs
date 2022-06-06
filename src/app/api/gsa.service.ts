import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { BaseApiService } from './base-api.service';
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
import { GetApplReq, GetApplRes } from './models/get-appl.models';
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
import { AbstractGsaService } from './models/abstract-gsa.service';

@Injectable({
  providedIn: 'root',
})
export class GsaService extends BaseApiService implements AbstractGsaService {
  private baseRoute = '';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  /**
   * 取得首頁資料
   */
  GetHomeData(): Observable<GetHomeDataRes> {
    const apiUri = this.baseRoute + '/GetHomeData';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

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

    return super
      .post<BatchNotifyReq, BatchNotifyRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }

  /**
   * 社會課/醫院帳戶變更密碼
   */
  ChangePassword(req: ChangePasswordReq): Observable<ChangePasswordRes> {
    const apiUri = this.baseRoute + '/ChangePassword';
    const acceptedCodes: Array<BaseAPICodes> = [BaseAPICodes.SUCCESS];

    return super
      .post<ChangePasswordReq, ChangePasswordRes>(apiUri, req)
      .pipe(switchMap((res) => super.throwNotIn(acceptedCodes, res)));
  }
}
