import { Injectable, NotFoundException } from '@nestjs/common';
import { signupDto } from 'libs/shared/src/DTO/auth.dto';
import { signup } from './../../../../libs/shared/src/schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { loginDto } from '../../../../libs/shared/src/DTO/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(signup.name) private authModal: Model<signup>,
    private jwtService: JwtService
  ) {}

  async signup(data: signupDto) {
    const haveUser = await this.authModal.findOne({ email: data.email });
    if (haveUser) {
      return { status: 'error', message: 'Email already exists' };
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const payload = { ...data, password: hashedPassword };
    const result = await this.authModal.create(payload);

    return {
      status: 'success',
      message: 'Signup successfully',
      data: result,
    };
  }

  async login(data: loginDto) {
    const isRegisteredUser = await this.authModal.findOne({email: data?.email });
    if (!isRegisteredUser) {
      throw new NotFoundException('Email or password is incorrect');
    }
    const isCorrectPassword = await bcrypt.compare(
      data.password,
      isRegisteredUser.password
    );
    if (!isCorrectPassword) {
      throw new NotFoundException('Email or password is incorrect');
    }
    const payload = {
      id: isRegisteredUser?._id,
      email: isRegisteredUser?.email,
      role: isRegisteredUser?.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      sttaus:'success',
      message:'get access token successfully',
      accessToken:token,
      data:isRegisteredUser
    }
  }
}
