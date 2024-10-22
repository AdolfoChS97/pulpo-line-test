import { Module } from '@nestjs/common';
import { HederaService } from './hedera.service';
import { HederaController } from './hedera.controller';
import { HederaProvider } from './providers/hedera.provider';

@Module({
  controllers: [HederaController],
  providers: [HederaProvider, HederaService],
})
export class HederaModule {}
