import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto, LogoutDto, RegisterDto } from '../dtos/auth.dto';

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

  @ApiBody({
    type: LoginDto,
    description: 'Login user',
    required: true,
  })
  @Post('login')
  async login(
    @Body()
    credentials: LoginDto,
  ) {
    return this.authService.login(credentials);
  }

  @ApiBody({
    type: LogoutDto,
    description: 'Logout user',
    required: true,
  })
  @Post('logout')
  logout(@Body() { userId }: LogoutDto) {
    return this.authService.logout(userId);
  }
}
