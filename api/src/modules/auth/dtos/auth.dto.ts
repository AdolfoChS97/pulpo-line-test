import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class RegisterDto extends PickType(User, ['email', 'password']) {}

export class LoginDto extends PickType(User, ['email', 'password']) {}
