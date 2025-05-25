import { IPublicUserFields } from '../common/interfaces/public.user.interface';

export interface IAuthReturn {
  token: string;
  user: IPublicUserFields;
}

export interface IAuthResponse {
  message: string;
  data: IAuthReturn;
}

export interface IGeneralResponse {
  message: string;
  data: any;
}
