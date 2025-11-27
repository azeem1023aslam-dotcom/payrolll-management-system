import { Body, Controller, Post } from '@nestjs/common';
import {
  forgetPasswordDto,
  loginDto,
  resetPasswordDto,
  signupDto,
} from '@shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGatewayService } from '../services/auth.service';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly gatewayService: AuthGatewayService) {}

  @Post('signup')
  signup(@Body() body: signupDto) {
    return this.gatewayService.signup(body);
  }

  @Post('signin')
  login(@Body() body: loginDto) {
    return this.gatewayService.login(body);
  }

  @Post('forget-password')
  forgetPassword(@Body() body: forgetPasswordDto) {
    return this.gatewayService.forgetPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: resetPasswordDto) {
    return this.gatewayService.resetPassword(body);
  }
}