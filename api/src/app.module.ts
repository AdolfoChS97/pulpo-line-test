import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostgresDBProviderModule } from './shared/modules/postgres-db.provider.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HederaModule } from './modules/hedera/hedera.module';
import { JwtModule } from '@nestjs/jwt';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PostgresDBProviderModule,
    JwtModule.register({
      global: true,
      secret: configService.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: configService.get('JWT_TIME_EXPI') },
    }),
    AuthModule,
    HederaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
