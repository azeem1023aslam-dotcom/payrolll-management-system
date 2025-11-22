import { Body, Controller, Post } from '@nestjs/common';
import {
  forgetPasswordDto,
  loginDto,
  resetPasswordDto,
  signupDto,
} from '@shared';
import { GatewayService } from './gateway.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './../../../auth/src/app/role-based-authorization/roles.decorator';
import { AuthController } from './../../../auth/src/app/auth.controller';

@ApiBearerAuth()
@Controller('auth')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

}
