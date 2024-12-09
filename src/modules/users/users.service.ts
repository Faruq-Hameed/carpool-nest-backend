import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  {User}  from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Fetch a user by ID
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
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
}
