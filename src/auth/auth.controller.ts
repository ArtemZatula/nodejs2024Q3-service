import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredsDto } from './dto/auth-creds.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: AuthCredsDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('signup')
  async signup(@Body() signUpDto: AuthCredsDto) {
    return this.authService.signup(signUpDto);
  }
}
