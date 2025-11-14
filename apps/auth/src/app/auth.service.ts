import { Injectable } from '@nestjs/common';
import { signupDto } from 'libs/shared/src/DTO/auth.dto';
import { signup } from './../../../../libs/shared/src/schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(signup.name) private authModal: Model<signup>) {}

  async signup(data: signupDto) {
  console.log('Received signup', data);

  const haveUser = await this.authModal.findOne({ email: data.email });
  if (haveUser) {
    return { status: 'error', message: 'Email already exists' };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const payload = { ...data, password: hashedPassword };
  await this.authModal.create(payload);

  return { status: 'success', message: 'Signup successfully' };
}

  login(data: any) {
    return { message: `Hello login api ${data}` };
  }
}
