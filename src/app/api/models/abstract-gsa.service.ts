import { Observable } from 'rxjs';
import { AddApplReq, AddApplRes } from './add-appl.models';
import { AddHCProgramReq, AddHCProgramRes } from './add-hcprogram.models';
import { AddNewsReq, AddNewsRes } from './add-news.models';
import { ArrangeApplReq, ArrangeApplRes } from './arrange-appl.models';
import { BatchNotifyReq, BatchNotifyRes } from './batch-notify.models';
import { CancelApplReq, CancelApplRes } from './cancel-appl.models';
import { ChangePasswordReq, ChangePasswordRes } from './change-password.models';
import { CompleteApplReq, CompleteApplRes } from './complete-appl.models';
import { GetApplListReq, GetApplListRes } from './get-appl-list.models';
import { GetApplReq, GetApplRes } from './get-appl.models';
import { GetHomeDataRes } from './get-home-data.models';
import { GetHospDataRes } from './get-hosp-data.models';
import { GetNewsListReq, GetNewsListRes } from './get-news-list.models';
import { GetNewsReq, GetNewsRes } from './get-news.models';
import { GetSettingsRes } from './get-settings.models';
import { LoginReq, LoginRes } from './login.models';
import { ReviewApplReq, ReviewApplRes } from './review-appl.models';
import { UpdateApplReq, UpdateApplRes } from './update-appl.models';
import {
  UpdateHCProgramReq,
  UpdateHCProgramRes,
} from './update-hcprogram.models';
import { UpdateNewsReq, UpdateNewsRes } from './update-news.models';
import { VerifyReq, VerifyRes } from './verify.models';

export abstract class AbstractGsaService {
  /**
   * 取得首頁資料
   */
  abstract GetHomeData(): Observable<GetHomeDataRes>;
  /**
   * 取得醫院資料
   */
  abstract GetHospData(): Observable<GetHospDataRes>;
  /**
   * 取得字典檔設定
   */
  abstract GetSettings(): Observable<GetSettingsRes>;
  /**
   * 身分認證
   */
  abstract Verify(req: VerifyReq): Observable<VerifyRes>;
  /**
   * 新增申請單
   */
  abstract AddAppl(req: AddApplReq): Observable<AddApplRes>;
  /**
   * 更新申請單
   */
  abstract UpdateAppl(req: UpdateApplReq): Observable<UpdateApplRes>;
  /**
   * 取消申請單
   */
  abstract CancelAppl(req: CancelApplReq): Observable<CancelApplRes>;
  /**
   * 社會課/醫院帳戶登入
   */
  abstract Login(req: LoginReq): Observable<LoginRes>;
  /**
   * 取得申請單列表
   */
  abstract GetApplList(req: GetApplListReq): Observable<GetApplListRes>;
  /**
   * 取得一筆申請單
   */
  abstract GetAppl(req: GetApplReq): Observable<GetApplRes>;
  /**
   * 審核申請單
   */
  abstract ReviewAppl(req: ReviewApplReq): Observable<ReviewApplRes>;
  /**
   * 安排健檢
   */
  abstract ArrangeAppl(req: ArrangeApplReq): Observable<ArrangeApplRes>;
  /**
   * 完成健檢
   */
  abstract CompleteAppl(req: CompleteApplReq): Observable<CompleteApplRes>;
  /**
   * 取得最新消息列表
   */
  abstract GetNewsList(req: GetNewsListReq): Observable<GetNewsListRes>;
  /**
   * 取得一筆最新消息
   */
  abstract GetNews(req: GetNewsReq): Observable<GetNewsRes>;
  /**
   * 新增最新消息
   */
  abstract AddNews(req: AddNewsReq): Observable<AddNewsRes>;
  /**
   * 更新最新消息
   */
  abstract UpdateNews(req: UpdateNewsReq): Observable<UpdateNewsRes>;
  /**
   * 新增健檢項目
   */
  abstract AddHCProgram(req: AddHCProgramReq): Observable<AddHCProgramRes>;
  /**
   * 更新健檢項目
   */
  abstract UpdateHCProgram(
    req: UpdateHCProgramReq
  ): Observable<UpdateHCProgramRes>;
  /**
   * 批次發送自訂通知
   */
  abstract BatchNotify(req: BatchNotifyReq): Observable<BatchNotifyRes>;
  /**
   * 社會課/醫院帳戶變更密碼
   */
  abstract ChangePassword(
    req: ChangePasswordReq
  ): Observable<ChangePasswordRes>;
}
