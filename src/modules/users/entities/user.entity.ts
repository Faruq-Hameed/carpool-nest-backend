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
import { Car } from 'src/modules/cars/entities/car.entity';
import { Ride } from 'src/modules/rides/entities/ride.entity';
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

  // @Index()
  // @Column({ unique: true }) //NOT NEEDED
  // username: string;

  @Column()
  password: string;

  @OneToMany(() => Otp, (otp) => otp.user) //otp generated for the user
  otps: Otp[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ nullable: true })
  occupation?: string;

  @Column({ nullable: true })
  residential: string;

  @Index()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.RESTRICTED,
  })
  status: Status;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'json', nullable: true })
  verificationInfo?: Record<string, any>; //verification info returned from provider

  @Column({ type: 'json', nullable: true })
  licenseVerificationInfo?: Record<string, any>; //verification info returned from provider

  @Column({ default: false })
  isLicenseVerified: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: 0 })
  totalTripsJoined: number;

  @Column({ default: 0 })
  totalTripsCreated: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  //   // Relationships
  //   @OneToMany(() => Car, car => car.owner)
  //   cars: Car[];

  //   @OneToMany(() => Ride, ride => ride.driver)
  //   rides: Ride[];

  // private async hashPassword(): Promise<void> {
  //   if (this.password && this.password !== this.currentPasswordHash) {
  //     const salt = await bcrypt.genSalt(10);
  //     this.password = await bcrypt.hash(this.password, salt);
  //   }
  // }

  // Method to compare passwords
  // async comparePassword(userPassword: string): Promise<boolean> {
  //   return bcrypt.compare(userPassword, this.password);
  // }
}
