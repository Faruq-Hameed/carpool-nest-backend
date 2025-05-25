import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

export enum PurposeEnum {
  VERIFY_PHONE = 'verify_phone',
  VERIFY_EMAIL = 'verify_email',
  RESET_PASSWORD = 'reset_password',
  RESET_EMAIL = 'reset_email',
  LOGIN= 'login'
}

export enum OtpChannel {
  SMS = 'sms',
  EMAIL = 'email',
}

@Entity()
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string //uuid of the user

  @Column()
  otp: string;

  @Column()
  purpose: PurposeEnum;

  @Column()
  channel: OtpChannel; //channel used to receive the otp

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
