import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { forgetPasswordDto, loginDto, signupDto } from 'libs/shared/src/DTO/auth.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(SERVICES.AUTH) private authClient: ClientProxy,
    @Inject(SERVICES.EMPLOYEE) private employeeClient: ClientProxy,
    @Inject(SERVICES.LEAVES) private leavesClient: ClientProxy,
  ) {}

  async signup(body: signupDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth.signup', body)
      );
      console.log('GATEWAY RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY ERROR >>>', error);
      return { status: 'error', message: error.message || 'Internal server error' };
    }
  }

  async login(body: loginDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth.signin', body)
      );
      console.log('GATEWAY RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY ERROR >>>', error);
      return { status: 'error', message: error.message || 'Internal server error' };
    }
  }

  async forgetPassword(body: forgetPasswordDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth.forgetPassword', body)
      );
      console.log('GATEWAY RESULT >>>', result);
      return result;
    } catch (error) {
      console.error('GATEWAY ERROR >>>', error);
      return { status: 'error', message: error.message || 'Internal server error' };
    }
  }

}
