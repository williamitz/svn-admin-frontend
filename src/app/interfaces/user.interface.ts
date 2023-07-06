// Generated by https://quicktype.io

export interface IUserListResponse {
  data:  IUser[];
  total: number;
}

export interface IUser {
  status:       boolean;
  createAt:     string;
  id:           string;
  name:         string;
  surname:      string;
  fullname:     string;
  email:        string;
  phone:        null | string;
  roles:        Role[];
  organization: Organization;
  timezone:     Timezone | null;
}

export interface Organization {
  status:        boolean;
  userCreate:    string;
  createAt:      string;
  id:            string;
  bussinnesName: string;
  document:      string;
  address:       string;
  email:         string;
  phone:         string;
  costPerMinute: string;
  logoUrl:       string;
  backdropUrl:   string;
  country:       Country;
}

export interface Country {
  status:        boolean;
  userCreate:    string;
  createAt:      string;
  id:            string;
  name:          string;
  isoAlphaThree: string;
  moneyCode:     string;
  moneySymbol:   string;
  prefixPhone:   string;
  img:           string;
}

export interface Role {
  id:   string;
  name: string;
}

export interface Timezone {
  status:     boolean;
  userCreate: string;
  createAt:   string;
  id:         string;
  name:       string;
  timeZone:   string;
  country:       Country;
}
