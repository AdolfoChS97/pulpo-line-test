import moment from 'moment';
import * as bcryptjs from 'bcryptjs';
import { MoreThan, Repository } from 'typeorm';
import { RegisterDto } from '../dtos/auth.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async userNameOrEmailExists(
    email: string,
    id: string = '',
    itself: boolean = false,
  ) {
    try {
      let query = this.usersRepository
        .createQueryBuilder('user')
        .select(['user.email'])
        .andWhere('user.email = :email', { email });

      if (itself) {
        query = query.andWhere('user.id != :id', { id });
      }

      const previousRecord = await query.getOne();
      return previousRecord;
    } catch (error) {
      throw error;
    }
  }

  async create(user: RegisterDto) {
    try {
      const { email, password } = user;

      if ((await this.userNameOrEmailExists(email)) !== null) {
        throw new BadRequestException('email already exists');
      }

      const createdUser = await this.usersRepository.save({
        email: email,
        password: await bcryptjs.hash(password, 10),
      });

      delete createdUser.password;

      return {
        message: 'user created successfully',
        data: createdUser,
      };
    } catch (e) {
      throw e;
    }
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  async createSession({ userId, token }: any) {
    try {
      const hasActiveSessions = await this.getActiveSession(userId);
      if (hasActiveSessions.length > 0) {
        return false;
      }
      const session = this.sessionsRepository.save({
        userId: userId,
        token: token,
        expiresAt: moment().add(8, 'hours').toDate(),
      });
      if (session) {
        return true;
      }
      return session;
    } catch (e) {
      throw e;
    }
  }

  async getActiveSession(userId: string) {
    try {
      return await this.sessionsRepository.findBy({
        userId: userId,
        isActive: true,
        expiresAt: MoreThan(new Date()),
      });
    } catch (e) {
      throw e;
    }
  }

  async setSessionAsInactive(sessionId: string) {
    try {
      return await this.sessionsRepository.update(
        { id: sessionId },
        { isActive: false },
      );
    } catch (e) {
      throw e;
    }
  }
}
