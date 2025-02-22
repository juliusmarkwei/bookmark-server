import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() body: SignupDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
