import { Client, Hbar } from '@hashgraph/sdk';
import { ConfigService } from '@nestjs/config';

export class HederaProvider {
  client: Client;
  accountId: string;
  privateKey: string;
  configService: ConfigService = new ConfigService();
  constructor() {
    this.client = Client.forTestnet();
    this.client.setOperator(
      this.configService.get('HEDERA_ACCOUNT_ID'),
      this.configService.get('HEDERA_PRIVATE_KEY'),
    );
    this.client.setDefaultMaxTransactionFee(new Hbar(100));
    this.client.setDefaultMaxQueryPayment(new Hbar(50));

    this.accountId = this.configService.get('HEDERA_ACCOUNT_ID');
    this.privateKey = this.configService.get('HEDERA_PRIVATE_KEY');
  }
}
