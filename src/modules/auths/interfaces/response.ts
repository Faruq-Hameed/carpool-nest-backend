import { IPublicUserFields } from "src/common/interfaces/public.user.interface";

export interface IAuthResponse {
    message: string
    token: string;
    user: IPublicUserFields;
}