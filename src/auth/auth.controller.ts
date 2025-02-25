import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  register(@Body() body: SignupDTO) {
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
