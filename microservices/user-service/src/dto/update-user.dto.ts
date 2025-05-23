import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}


// export class UpdateUserDto extends OmitType(CreateUserDto, ['username', "email"] as const) {}

// export class UpdateUserDto extends PartialType(CreateUserDto){}

// export class UpdateUserDto extends PickType(CreateUserDto, ['username'] as const) { }

// export class UpdateUserDto extends IntersectionType(CreateUserDto, AdditionalUserInfo) { }


// export class UpdateUserDto extends PartialType(
//     OmitType(CreateUserDto, ['username'] as const),
//   ) {}
  