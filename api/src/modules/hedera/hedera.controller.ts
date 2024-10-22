import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { HederaService } from './hedera.service';
import { CreateHederaTokenDto } from './dto/hedera.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Hedera')
@Controller('hedera')
export class HederaController {
  constructor(private readonly hederaService: HederaService) {}

  @ApiBody({
    type: CreateHederaTokenDto,
    description: 'Create hedera token',
    required: true,
  })
  @UseGuards(AuthGuard)
  @Post('/tokens')
  create(@Body() data: CreateHederaTokenDto) {
    return this.hederaService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('/tokens')
  findAll() {
    return this.hederaService.getAccountTokens();
  }
}
