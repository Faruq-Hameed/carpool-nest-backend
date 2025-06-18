import { Status } from 'src/shared/enums/status.enum';

export interface IUser {
  id: string;
  phonenumber: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  profilePicture?: string;
  occupation?: string;
  isAdmin: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
