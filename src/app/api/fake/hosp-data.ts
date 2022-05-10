import { YN } from '../../shared/enums/yn.enum';
import { HospData, HospDataHCProgram } from '../models/get-hosp-data.models';

const hospitalIDs = [1, 2, 3, 4, 5, 6];
const disabledHospitalIDs = [3];
const programsPerHospital = 6;

/**
 * 1 衛生福利部桃園醫院 (6)
 */
const HCPROGRAM_LIST_1: Array<HospDataHCProgram> = [
  {
    programID: 11,
    name: '小資族健檢套餐',
    description: `為上班忙碌的您
注意您的健康狀況
四種不同健檢套餐
多元的選擇一定有一套適合您`,
    charge: 3500,
    hospitalID: 1,
    enabled: YN.Y,
  },
  {
    programID: 12,
    name: '心肺腸胃健檢套餐',
    description: `擔心健康狀況
卻又不知從何下手
四種包含影像的高階檢查套餐
還有國人最重視的腸胃鏡
這次健檢是否要來點更全面的檢查`,
    charge: 12000,
    hospitalID: 1,
    enabled: YN.Y,
  },
  {
    programID: 13,
    name: '護心防癌健檢套餐',
    description: `是不是有家族病史
讓你好擔心!
正子電腦斷層針對癌症的檢查利器

天氣變化大心臟受的了嗎?
冠狀動脈攝影
幫您注意心臟血管栓塞狹隘`,
    charge: 20000,
    hospitalID: 1,
    enabled: YN.Y,
  },
  {
    programID: 14,
    name: '公教警消健檢專案',
    description: `為了公務人員及警消人員專門準備的健檢套餐
適用對象為各級政府機關、公私立學校、公現職員工暨警消人員、退休人員、眷屬
健檢時需出示公教人員證件(眷屬請攜帶影印本)`,
    charge: 3500,
    hospitalID: 1,
    enabled: YN.Y,
  },
  {
    programID: 15,
    name: '活力充沛套餐',
    description: `因為工作需求而做的勞工體檢
是不是想順便了解身體其他的狀況呢?
活力充沛有五種選擇
均包含勞工體檢項目`,
    charge: 2500,
    hospitalID: 1,
    enabled: YN.Y,
  },
  {
    programID: 16,
    name: '特定專案健檢',
    description: `★婚前健檢★
有健康的男女主人，才有美滿的婚姻，本院特地為準新人
設計了一套完善的婚前健康檢查，檢查項目除了一般的健康檢查外
更包含了家族疾病史與隱遺傳疾病(如：海洋性貧血、脊髓性肌肉萎縮症、蠶豆症篩檢....等)之檢查
這些隱性遺傳疾病，平時不會表現出來，直到生育了下一代，才在孩子身上表現，造成無可挽回的遺憾`,
    charge: 6000,
    hospitalID: 1,
    enabled: YN.Y,
  },
];

/**
 * 2 國軍桃園總醫院 (5)
 */
const HCPROGRAM_LIST_2: Array<HospDataHCProgram> = [
  {
    programID: 21,
    name: '半日檢大眾型特惠專案 E',
    description: `半日檢大眾型特惠專案 E

注意事項：請先行向本院健康管理中心辦理預約，預約專線03-4799595 ext.326502
1.受檢者前一天晚上0時後請勿進食，檢查當天08:30到達健康管理中心，並攜帶身分證、健保卡辦理報到。
2.預約受檢者，於受檢前三日先至健康管理中心領取糞便盒。
3.有意願做無痛無感胃、腸鏡檢查需預先清腸液衛教說明。`,
    charge: 5000,
    hospitalID: 2,
    enabled: YN.Y,
  },
  {
    programID: 22,
    name: '一日檢完整型特惠專案 D',
    description: `一日檢完整型特惠專案 D

注意事項：請先行向本院健康管理中心辦理預約，預約專線03-4799595 ext.326502
1.受檢者前一天晚上0時後請勿進食，檢查當天08:30到達健康管理中心，並攜帶身分證、健保卡辦理報到。
2.預約受檢者，於受檢前三日先至健康管理中心領取糞便盒。
3.有意願做無痛無感胃、腸鏡檢查需預先清腸液衛教說明。`,
    charge: 10000,
    hospitalID: 2,
    enabled: YN.Y,
  },
  {
    programID: 23,
    name: '一日檢完整型特惠專案 C',
    description: `一日檢完整型特惠專案 C

注意事項：請先行向本院健康管理中心辦理預約，預約專線03-4799595 ext.326502
1.受檢者前一天晚上0時後請勿進食，檢查當天08:30到達健康管理中心，並攜帶身分證、健保卡辦理報到。
2.預約受檢者，於受檢前三日先至健康管理中心領取糞便盒。
3.有意願做無痛無感胃、腸鏡檢查需預先清腸液衛教說明。`,
    charge: 21000,
    hospitalID: 2,
    enabled: YN.Y,
  },
  {
    programID: 24,
    name: '半日檢大眾型特惠專案 B',
    description: `半日檢大眾型特惠專案 B

注意事項：請先行向本院健康管理中心辦理預約，預約專線03-4799595 ext.326502
1.受檢者前一天晚上0時後請勿進食，檢查當天08:30到達健康管理中心，並攜帶身分證、健保卡辦理報到。
2.預約受檢者，於受檢前三日先至健康管理中心領取糞便盒。
3.有意願做無痛無感胃、腸鏡檢查需預先清腸液衛教說明。`,
    charge: 38000,
    hospitalID: 2,
    enabled: YN.Y,
  },
  {
    programID: 25,
    name: '一日檢完整型特惠專案 A',
    description: `一日檢完整型特惠專案 A

注意事項：請先行向本院健康管理中心辦理預約，預約專線03-4799595 ext.326502
1.受檢者前一天晚上0時後請勿進食，檢查當天08:30到達健康管理中心，並攜帶身分證、健保卡辦理報到。
2.預約受檢者，於受檢前三日先至健康管理中心領取糞便盒。
3.有意願做無痛無感胃、腸鏡檢查需預先清腸液衛教說明。`,
    charge: 41000,
    hospitalID: 2,
    enabled: YN.Y,
  },
];

/**
 * 3 桃園長庚健診中心 (4)
 */
const HCPROGRAM_LIST_3: Array<HospDataHCProgram> = [
  {
    programID: 31,
    name: '全身標準健診 - 標準守護型',
    description: `1. 全身系統性檢查
2. 標準內視鏡檢查`,
    charge: 16500,
    hospitalID: 3,
    enabled: YN.Y,
  },
  {
    programID: 32,
    name: '全身標準健診 - 舒活守護型',
    description: `1. 全身系統性檢查
2. 無痛內視鏡檢查`,
    charge: 23000,
    hospitalID: 3,
    enabled: YN.Y,
  },
  {
    programID: 33,
    name: '全身標準健診 - 舒活豪華守護型',
    description: `1. 全身系統性檢查
2. 無痛內視鏡檢查
3. 新式癌篩與代餐`,
    charge: 29500,
    hospitalID: 3,
    enabled: YN.Y,
  },
  {
    programID: 34,
    name: '全身標準健診 - 舒活豪華守護＋正子型',
    description: `1. 全身系統性檢查
2. 無痛內視鏡檢查
3. 新式癌篩與代餐
4. 正子電腦斷層掃描PET/CT Scan
(※正子電腦斷層掃描需於7 日內擇日於週二、三另行檢查)`,
    charge: 66000,
    hospitalID: 3,
    enabled: YN.Y,
  },
];

export const HOSP_DATA: HospData = {
  hospitalList: [
    {
      hospitalID: 1,
      name: '衛生福利部桃園醫院',
      siteUrl: 'https://www.tygh.mohw.gov.tw/?aid=54&pid=168',
      enabled: YN.Y,
    },
    {
      hospitalID: 2,
      name: '國軍桃園總醫院',
      siteUrl: 'https://www.aftygh.gov.tw/department/pgsn5-1',
      enabled: YN.Y,
    },
    {
      hospitalID: 3,
      name: '桃園長庚健診中心',
      siteUrl: 'https://www1.cgmh.org.tw/healthyhel',
      enabled: YN.Y,
    },
  ],
  HCProgramList: [
    // 1 衛生福利部桃園醫院
    ...HCPROGRAM_LIST_1,
    // 2 國軍桃園總醫院
    ...HCPROGRAM_LIST_2,
    // 3 桃園長庚健診中心
    ...HCPROGRAM_LIST_3,
  ],
};

export const HOSP_DATA2: HospData = {
  hospitalList: hospitalIDs.map((id) => ({
    hospitalID: id,
    name: `name ${id}`,
    siteUrl: 'https://www.google.com/',
    enabled: disabledHospitalIDs.includes(id) ? YN.N : YN.Y,
  })),
  HCProgramList: hospitalIDs.reduce<Array<HospDataHCProgram>>((list, HID) => {
    for (let n = 1; n <= programsPerHospital; n++) {
      const PID = (HID - 1) * programsPerHospital + n;

      list.push({
        programID: PID,
        name: `name ${HID}-${n}`,
        description: `description ${HID}-${n}
第二行
第三行
`,
        charge: PID * 100,
        hospitalID: HID,
        enabled: YN.Y,
      });
    }

    return list;
  }, []),
};
