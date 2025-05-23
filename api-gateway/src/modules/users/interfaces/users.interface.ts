import { Status } from "src/shared/enums/status.enum";

export interface IUser {
    id: string;
    phonenumber: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    balance: number;
    profilePicture?: string;
    occupation?: string;
    residential?: string;
    status: Status;
    isVerified: boolean;
    verificationInfo?: string;
    licenseVerificationInfo?: string;
    isLicenseVerified: boolean;
    isAdmin: boolean;
    totalTripsJoined: number;
    totalTripsCreated: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  