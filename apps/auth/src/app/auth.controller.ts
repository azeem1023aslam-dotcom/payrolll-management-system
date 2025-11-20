import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { forgetPasswordDto, loginDto, signupDto } from './../../../../libs/shared/src/DTO/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.signup')
  async signup(data: signupDto) {
    return this.authService.signup(data);
  }

  @MessagePattern('auth.signin')
  async login(data: loginDto) {
    return this.authService.login(data);
  }

  @MessagePattern('auth.forgetPassword')
  async forgetPassword(data: forgetPasswordDto) {
    return this.authService.forgetPassword(data);
  }
}
