import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/auth.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(user: RegisterDto) {
    try {
      return await this.usersService.create(user);
    } catch (e) {
      throw e;
    }
  }
}
