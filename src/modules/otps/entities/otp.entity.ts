import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

export enum OtpPurpose {
  VERIFY_PHONE = 'verify_phone',
  VERIFY_EMAIL = 'verify_email',
  RESET_PASSWORD = 'reset_password',
  RESET_EMAIL = 'reset_email',
  LOGIN = 'login',
}

export enum OtpChannel {
  SMS = 'sms',
  EMAIL = 'email',
}

@Entity()
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.otps, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  otp: string;

  @Column()
  purpose: OtpPurpose;

  @Column()
  channel: OtpChannel; //channel used to receive the otp

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
