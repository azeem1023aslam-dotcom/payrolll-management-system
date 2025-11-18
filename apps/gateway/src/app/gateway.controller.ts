import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  forgetPasswordDto,
  loginDto,
  resetPasswordDto,
  signupDto,
} from '@shared';
import { GatewayService } from './gateway.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './../../../auth/src/app/role-based-authorization/roles.decorator';
import { RolesGuard } from './../../../auth/src/app/role-based-authorization/roles.guard';

@ApiBearerAuth()
@Controller('auth')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('signup')
  signup(@Body() body: signupDto) {
    return this.gatewayService.signup(body);
  }

  @Post('signin')
  login(@Body() body: loginDto) {
    return this.gatewayService.login(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('forget-password')
  forgetPassword(@Body() body: forgetPasswordDto) {
    return this.gatewayService.forgetPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: resetPasswordDto) {
    return this.gatewayService.resetPassword(body);
  }
}
