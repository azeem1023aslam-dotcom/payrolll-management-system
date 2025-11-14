import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { signupDto } from './../../../../libs/shared/src/DTO/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.signup')
  async signup(data: signupDto) {
    console.log('Signup request received', data);
    return this.authService.signup(data);
  }

  @MessagePattern('login')
  login(data: any) {
    return this.authService.login(data);
  }
}
