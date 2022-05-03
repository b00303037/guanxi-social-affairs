import { YN } from '../../shared/enums/yn.enum';
import { HospData, HospDataHCProgram } from '../models/get-hosp-data.models';

const hospitalIDs = [1, 2, 3, 4, 5, 6];
const disabledHospitalIDs = [3];
const programsPerHospital = 6;

export const HOSP_DATA: HospData = {
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
