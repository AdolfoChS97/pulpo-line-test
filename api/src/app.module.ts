import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PostgresDBProviderModule } from './shared/modules/postgres-db.provider.module';

@Module({
  imports: [PostgresDBProviderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
