import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RegisterDto extends PickType(User, ['email', 'password']) {}

export class LoginDto extends PickType(User, ['email', 'password']) {}

export class LogoutDto {
  @ApiProperty({
    type: String,
    example: 'a9b5b8b0-0b9b-4b9b-8b0b-0b9b4b8b0b9b',
    description: 'User ID',
    required: true,
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
