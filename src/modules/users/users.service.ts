import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Or } from 'typeorm';

import { User } from './entities/user.entity';
import { IUser } from './interfaces/users.interface';
import { IPublicUserFields } from 'src/common/interfaces/public.user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /** Create a new user */
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, phonenumber } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phonenumber }],
      select: ['id', 'email', 'phonenumber'],
    });

    if (existingUser) {
      const existingField = existingUser.email === email ? 'email' : 'phone';
      throw new ConflictException(
        `A user with this ${existingField} already exist`,
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    const savedData = await this.userRepository.save(newUser);
    // return {
    //   id: savedData.id,
    //   firstname: savedData.firstname,
    //   lastname: savedData.lastname,
    //   email: savedData.email,
    //   phonenumber: savedData.phonenumber,
    //   profilePicture: savedData.profilePicture,
    //   createdAt: savedData.createdAt,
    //   updatedAt: savedData.updatedAt,
    // };
  }

  // Fetch a user by ID
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * Find user by any field(s) e.g., { username: 'user01' }, ['username', 'email']
   * @param field - The field(s) to match the user by.
   * @param selectFields - The fields to return; defaults to all fields.
   */
  async findUserByField(
    field: Partial<User>,
    selectFields?: (keyof User)[],
    throwError?: boolean,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: field,
      select: selectFields || undefined, // If no fields are specified, return all fields
    });
    if (!user && throwError) {
      throw new NotFoundException('user with not found');
    }
    return user;
  }

  /**This service check if the user exists and if not it throw error from here */
  async validateUserWithField(field: Partial<User>): Promise<void> {
    const user = await this.findUserByField(field);
    if (!user) throw new NotFoundException('user with not found');
    return;
  }

  // Fetch all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Update a user's information
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(id, updateUserDto);
    return this.getUserById(id);
  }

  // Delete a user (soft delete if desired)
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  /** Helper method to extract which field caused the unique constraint violation */
  private extractDuplicateField(error: any): string {
    if (error.detail.includes('email')) return 'email';
    if (error.detail.includes('phonenumber')) return 'phone number';
    if (error.detail.includes('username')) return 'username';
    return 'one or more fields';
  }
}
