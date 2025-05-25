import { UUID } from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { Status } from 'src/shared/enums/status.enum';

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phonenumber: string; //signing in wih phone number and passcode

  @Column()
  passcode: string;

  @Column({ type: String, nullable: true })
  userId: string; //the corresponding user id form user table

  @Index()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE, //only active account can login
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
