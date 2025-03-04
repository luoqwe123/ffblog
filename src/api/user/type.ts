export interface IregisterRes {
  code: number;
  data: Data;
}

interface Data {
  token: string;
} 
export interface IloginRes {
  code: number;
  data: Data;
}
