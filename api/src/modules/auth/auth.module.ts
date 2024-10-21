import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UsersService, AuthService],
})
export class AuthModule {}
