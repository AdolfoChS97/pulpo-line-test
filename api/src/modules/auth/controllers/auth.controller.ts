import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '../dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: RegisterDto,
    description: 'Register new user',
    required: true,
  })
  @Post('register')
  register(
    @Body()
    user: RegisterDto,
  ) { 
    return this.authService.register(user);
  }
}
