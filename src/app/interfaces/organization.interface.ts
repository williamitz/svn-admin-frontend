// Generated by https://quicktype.io

export interface IOrganizationListResponse {
  data:  IOrganization[];
  total: number;
}


export interface IOrganizationByIdResponse {
  data:  IOrganization;
}

export interface IOrganization {
  status:        boolean;
  createAt:      string;
  id:            string;
  bussinnesName: string;
  document:      string;
  address:       string;
  email:         null | string;
  phone:         null | string;
  costPerMinute: string;
  campus:        ICampus[];
}

export interface ICampus {
  status:     boolean;
  userCreate: string;
  createAt:   string;
  id:         string;
  campusName: string;
  city:       string;
  address:    null;
}



