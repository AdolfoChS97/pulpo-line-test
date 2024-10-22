import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHederaTokenDto } from './dto/hedera.dto';
import { HederaProvider } from './providers/hedera.provider';
import {
  TokenCreateTransaction,
  PrivateKey,
  AccountBalanceQuery,
} from '@hashgraph/sdk';
@Injectable()
export class HederaService {
  // client;
  constructor(private hedera: HederaProvider) {}

  async create({
    name,
    symbol,
    decimals,
    initialSupply,
  }: CreateHederaTokenDto) {
    try {
      const transaction = await new TokenCreateTransaction()
        .setTokenName(name)
        .setTokenSymbol(symbol)
        .setDecimals(decimals)
        .setInitialSupply(initialSupply)
        .setTreasuryAccountId(this.hedera.accountId)
        .setAdminKey(PrivateKey.fromString(this.hedera.privateKey))
        .freezeWith(this.hedera.client);

      const signTx = await transaction.sign(
        PrivateKey.fromString(this.hedera.privateKey),
      );

      const txResponse = await signTx.execute(this.hedera.client);
      const receipt = await txResponse.getReceipt(this.hedera.client);
      const tokenId = receipt.tokenId;

      return tokenId.toString();
    } catch (e) {
      throw new InternalServerErrorException(e?.message, {
        cause: e?.stack.toString(),
      });
    }
  }

  async getAccountTokens() {
    try {
      const balanceQuery = await new AccountBalanceQuery()
        .setAccountId(this.hedera.accountId)
        .execute(this.hedera.client);

      const tokenBalances = balanceQuery.tokens;
      const hbarBalance = balanceQuery.hbars;

      return {
        hbars: hbarBalance.toString(),
        tokens: tokenBalances.toString(),
      };
    } catch (e) {
      throw new InternalServerErrorException('Error al obtener los balances', {
        cause: e?.stack.toString(),
      });
    }
  }
}
