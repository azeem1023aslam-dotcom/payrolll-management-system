import { Body, Controller, Get, Post } from '@nestjs/common';
import { signupDto } from './../../../../libs/shared/src/DTO/auth.dto';
import { GatewayService } from './gateway.service';

@Controller('auth')
export class GatewayController {
  constructor(private readonly gatewayService:GatewayService) {}

  @Post('signup')
  signup(@Body() body: signupDto) {
    return this.gatewayService.signup(body);
  }

  @Get('login')
  getLogin() {
    return 'login successfully!';
  }
}
