import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Status } from 'src/shared/enums/status.enum';
import { Otp } from 'src/modules/otps/entities/otp.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phonenumber: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  // @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  // balance: number;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ nullable: true })
  occupation?: string;

  // @Column({ nullable: true })
  // residential: string; //SHOULD BE WITH KYC

  // @Index()
  // @Column({
  //   type: 'enum',
  //   enum: Status,
  //   default: Status.NOT_VERIFIED, // NOT NEEDED KYC WILL HANDLE THIS
  // })
  // status: Status;

  // @Column({ default: false })
  // isVerified: boolean;

  // @Column({ type: 'json', nullable: true })
  // verificationInfo?: Record<string, any>; //verification info returned from provider

  // @Column({ type: 'json', nullable: true })
  // licenseVerificationInfo?: Record<string, any>; //verification info returned from provider

  // @Column({ default: false })
  // isLicenseVerified: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // Relationships

  @OneToMany(() => Otp, (otp) => otp.user) //otp generated for the user
  otps: Otp[];

  //   @OneToMany(() => Car, car => car.owner)
  //   cars: Car[];

  //   @OneToMany(() => Ride, ride => ride.driver)
  //   rides: Ride[];
}
