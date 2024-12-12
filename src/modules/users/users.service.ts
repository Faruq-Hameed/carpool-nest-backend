import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { User } from './entities/user.entity';
import { IUser } from './interfaces/users.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique constraint error
        const duplicateField = this.extractDuplicateField(error);
        throw new ConflictException(`User already exists with this ${duplicateField} `);
      }
      throw error;
    }
  }

  // Fetch a user by ID
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  /**Find user by any fields e.g {username: 'user01'} */
  async findUserByField(field: Partial<User>): Promise<User | null> {
    return this.userRepository.findOneBy(field); 
  }
  // Fetch all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Update a user's information
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
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
