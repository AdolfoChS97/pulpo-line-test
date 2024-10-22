import * as bcryptjs from 'bcryptjs';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(user: RegisterDto) {
    try {
      return await this.usersService.create(user);
    } catch (e) {
      throw e;
    }
  }

  async login(credentials: LoginDto) {
    try {
      const { email, password } = credentials;
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        throw new UnauthorizedException('user not found');
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('invalid password');
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = await this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_TIME_EXPI'),
      });

      const sessionCreated = await this.usersService.createSession({
        userId: user.id,
        token: token,
      });

      if (!sessionCreated) {
        throw new UnauthorizedException('user already logged in');
      }

      return { token };
    } catch (e) {
      throw e;
    }
  }

  async logout(userId: string) {
    try {
      const [session] = await this.usersService.getActiveSession(userId);

      if (!session) {
        throw new UnauthorizedException('user not logged in');
      }

      await this.usersService.setSessionAsInactive(session.id);
      return { message: 'user logged out successfully' };
    } catch (e) {
      throw e;
    }
  }
}
