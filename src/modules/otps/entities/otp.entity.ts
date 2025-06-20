import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

export enum OtpPurpose {
  VERIFY_PHONE = 'VERIFY_PHONE',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
  RESET_EMAIL = 'RESET_EMAIL',
  LOGIN = 'LOGIN',
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

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phonenumber: string;

  @Column()
  purpose: OtpPurpose;

  @Column()
  channel: OtpChannel; //channel used to receive the otp

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
