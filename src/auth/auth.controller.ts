import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    console.log(body);
    return this.authService.register(body);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
