import {
  Injectable
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  forgetPasswordDto,
  loginDto,
  signupDto,
  signup,
  resetPasswordDto,
} from '@shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(signup.name) private authModal: Model<signup>,
    private jwtService: JwtService
  ) {}

  //signup function
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

  // login function
  async login(data: loginDto) {
    const isRegisteredUser = await this.authModal.findOne({
      email: data?.email,
    });
    if (!isRegisteredUser) {
      throw new RpcException({
        status: 404,
        message: 'Email or password is incorrect',
      });
    }
    const isCorrectPassword = await bcrypt.compare(
      data.password,
      isRegisteredUser.password
    );
    if (!isCorrectPassword) {
      throw new RpcException({
        status: 404,
        message: 'Email or password is incorrect',
      });
    }
    console.log(isRegisteredUser,'isRegisteredUser');
    
    const payload = {
      userId: isRegisteredUser?._id,
      email: isRegisteredUser?.email,
      role: isRegisteredUser?.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      sttaus: 'success',
      message: 'get access token successfully',
      accessToken: token,
      data: isRegisteredUser,
    };
  }

  // forgot password function
  async forgetPassword(data: forgetPasswordDto) {
    const isRegisteredUser = await this.authModal.findOne({
      email: data?.email,
    });
    if (!isRegisteredUser) {
      throw new RpcException({
        status: 404,
        message: 'Email not found',
      });
    }
    const token = this.jwtService.sign(
      { email: isRegisteredUser?.email, userId: isRegisteredUser?._id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '5m',
      }
    );
    return {
      status: 'success',
      message: 'Password reset email sent',
      data: token,
    };
  }

  // reset passord function
  async resetPassword(body: resetPasswordDto) {
    if (body.password !== body.confirmPassword) {
      throw new RpcException({
        status: 404,
        message: 'Your password and confirm password are not match',
      });
    };

    let isValidToken:any;

    try {
      isValidToken = this.jwtService.verify(body.token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new RpcException({
        status: 404,
        message: 'Invalid or expired token',
      });
    }
    const user = await this.authModal.findOne({ _id: isValidToken.userId });
    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
    await user.save();
    return {
      message: 'Password reset successfully',
    };
  }
}
