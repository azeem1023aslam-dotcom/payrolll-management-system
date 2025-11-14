import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { signupDto } from './../../../../libs/shared/src/DTO/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.signup')
  async signup(data: signupDto) {
    return this.authService.signup(data);
  }

  @MessagePattern('auth.signin')
  async login(data: any) {
    return this.authService.login(data);
  }
}
