import { OmitType } from '@nestjs/swagger';
import { Token } from '../entities/token.entity';

export class CreateHederaTokenDto extends OmitType(Token, [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
]) {}
