import { parse } from 'date-fns';
import { YN } from '../../shared/enums/yn.enum';
import { News } from '../models/get-news.models';

const pinnedNewsIDs = [2, 3, 5, 8];
const disabledNewsIDs = [3, 6];
const newsDataList = [
  {
    title: '紓困金轉帳截止日期適逢例假日延至5月2日',
    date: '2022/04/14',
    content: `<p style="font-size: 18px;">本鎮紓困金發放辦理轉帳申請期間至4月30日止,適逢假日順延至5月2日截止辦理。</p>`,
  },
  {
    title: '111年度關西鎮公所補助自費健康檢查公告',
    date: '2022/03/30',
    content: `111年度關西鎮公所補助自費健康檢查公告`,
  },
  {
    title: '新竹縣關西鎮公所因應新冠肺炎疫情發放紓困金作業要點',
    date: '2022/04/25',
    content: `<p style="font-size: 18px;">新竹縣關西鎮公所（以下簡稱本所）為因應新冠肺炎疫情發放民生紓困金之作業需要，依據「新竹縣關西鎮因應新冠肺炎疫情紓困自治條例」（以下簡稱本條例）訂定本要點。<br>
一、民生紓困金之發放依本條例經關西鎮民代表會(以下簡稱代表會)審議通過當日即111年 2 月 24 日（含）前已設籍關西鎮（以下簡稱本鎮）者為造冊之發放對象；低收入戶之民生紓困金亦同。<br>
二、民生紓困金每人發給現金新臺幣二千元；本鎮列案低收入戶每戶另加發紓困金新臺幣一萬元(直接轉帳)。<br>
三、民生紓困金以現金發放者：採全戶領取、個人領取、委託他人領取個人、委託他人領取全戶、外籍配偶持長期居留證或定居證領取。<br>
四、民生紓困金之領取由本所統一製發通知單及委託書，本鎮鎮民應備證件為身份證正本及印章，填妥領取方式後，依通知單通知地點領取民生紓困金。<br>
五、委託他人代領民生紓困金應填寫委託書，未滿七歲領取人委託他人代領由法定代理人填寫委託書，若法定代理人親自領取則免填。<br>
六、符合領取民生紓困金資格之鎮民，於發放起始日前死亡或於發放起始日前遷出本鎮者，喪失領取資格（以戶政機關提供之名冊為據）。<br>
七、民生紓困金發放期間為111年4月18日至4月20日，每日上午10時起至下午4時止，由本所排定地點發放，民眾於下午4時以前到達發放所者皆可領取。<br>
八、排定日期無法領取者請於111年4月22日(星期五)、4月23日(星期六)、4月24日(星期日)每日上午9時至下午4時前至本所領取現金；申請轉帳者於4月25日至4月30日親送本所或郵寄(以郵戳為憑)提出申請(附件三)，經本所審核通過，由本所統一於5月31日前辦理轉帳，逾4月30日前未領取或未提出申請，視同放棄不再發給民生紓困金。</p>`,
  },
  {
    title: '古蹟關西分駐所【經緯線上的音符】公益音樂會',
    date: '2022/04/25',
    content: `古蹟關西分駐所【經緯線上的音符】公益音樂`,
  },
  {
    title: '客家委員會提升客語社群活力補助作業要點',
    date: '2022/04/22',
    content: `客家委員會提升客語社群活力補助作業要點`,
  },
  {
    title: '4/26-28（星期二至星期四） 環教暨職安衛研習 停收垃圾',
    date: '2022/04/22',
    content: `<p style="font-size: 18px;">4/26-28（星期二至星期四） 環教暨職安衛研習 停收垃圾</p>`,
  },
  {
    title: '111年4月25日關西鎮明德路工程施工公告',
    date: '2022/04/22',
    content: `111年4月25日關西鎮明德路工程施工公告`,
  },
  {
    title:
      '國立公共資訊圖書館2022年世界閱讀日「索書號-探尋故事海洋之謎」系列活動',
    date: '2022/04/21',
    content: `<p style="font-size: 18px;">一、國立公共資訊圖書館為推展閱讀風氣，以「索書號-探尋故事海洋之謎」為主題設計多元閱讀遊戲體驗，喚起民眾對閱讀的熱情，特於本（111）年4月23日（星期六）起辦理系列活動。<br>
二、活動內容包含實境解謎遊戲、STEAM手作工作坊、永續市集、書香騎士說故事、生活大師講座/書展/影展等，詳情請詳閱活動官網（https://reurl.cc/pWqoDZ），相關文宣如附件，或至（https://reurl.cc/ZrRErQ）下載。<br>
三、主題活動訂於4月23日（星期六）上午10時至下午17時，於本館（臺中市南區五權南路100號）一、二樓進行。<br>
四、實境遊戲活動將於4月23日至9月30日進行，將本館化身為大型解謎遊戲現場，每個角落都藏著令人驚喜的關卡線索，共分為家庭版與玩家版兩種體驗方式。<br>
五、本案相關事宜請逕洽本館輔導推廣科洪敦明先生（電話：04-22625100分機1503，a15125@nlpi.edu.tw）</p>`,
  },
  {
    title:
      '為振興客庄經濟，請惠予協助宣傳「客庄券2.0專案」(111年4月30日屆期)用券事宜',
    date: '2022/04/21',
    content: `為振興客庄經濟，請惠予協助宣傳「客庄券2.0專案」(111年4月30日屆期)用券事宜`,
  },
  {
    title:
      '為振興客庄經濟，請惠予協助宣傳「客庄券2.0專案」(電子券將於111年4月30日屆期)用券事宜',
    date: '2022/04/21',
    content: `為振興客庄經濟，請惠予協助宣傳「客庄券2.0專案」(電子券將於111年4月30日屆期)用券事宜`,
  },
  {
    title:
      '為有效振興客庄經濟，請惠予協助宣傳「客庄券2.0專案」用券事宜(電子券將111年4月30日屆期)',
    date: '2022/04/15',
    content: `為有效振興客庄經濟，請惠予協助宣傳「客庄券2.0專案」用券事宜(電子券將111年4月30日屆期)`,
  },
  {
    title: '衛生福利部「0-6歲國家一起養」政策說明資料',
    date: '2022/04/14',
    content: `<p style="font-size: 18px;">為持續落實「0-6歲國家一起養」政策，政府自2022年8月起更進一步升級「提高育兒津貼」、「增加托育補助」、「就學費用再降低」3大策略，再降低就學費用及再加發津貼，減輕家庭育兒負擔，讓年輕爸媽更實質有感。行政院特策製旨揭說明資料，請至行政院全球資訊網「政策與計畫—政策櫥窗」項下下載。</p>`,
  },
];

export const NEWS_LIST: Array<News> = newsDataList.map<News>((data, i) => {
  const newsID: number = i + 1;

  return {
    newsID,
    title: data.title,
    date: data.date,
    content: data.content,
    pinned: pinnedNewsIDs.includes(newsID) ? YN.Y : YN.N,
    enabled: !disabledNewsIDs.includes(newsID) ? YN.Y : YN.N,
    startDatetime: parse(
      `2022/${newsID}/${newsID} ${newsID}:${(newsID * 5) % 60}:0 0`,
      'yyyy/M/d h:m:s S',
      new Date()
    ).toISOString(),
    endDatetime: new Date('2022/12/31').toISOString(),
  };
});
