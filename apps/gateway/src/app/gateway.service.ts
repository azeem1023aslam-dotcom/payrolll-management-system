import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { signupDto } from 'libs/shared/src/DTO/auth.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
 constructor(@Inject('AUTH') private authClient: ClientProxy) {}
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
}
