import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UserService.createUser(createUserDto);
  }

  @Post('login')
  temporaryLogin(@Body() loginUser: Partial<CreateUserDto>) {
    return this.UserService.tempLogin(loginUser);
  }
  // tempLogin

  @Get()
  findAll() {
    return this.UserService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UserService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.deleteUser(id);
  }
}
