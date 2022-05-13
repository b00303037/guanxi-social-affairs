export type User = ApplUser | GovtUser | HospUser;

export interface ApplUser {
  role: 'appl';
  IDNo: string;
}

export interface GovtUser {
  role: 'govt';
  username: string;
}

export interface HospUser {
  role: 'hosp';
  username: string;
  hospitalID: number;
}
