import { Module } from '@nestjs/common';
import { AuthController } from './app/auth.controller';
import { AuthService } from './app/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqModule } from '../../../libs/shared/src/lib/rmq.module';
import { signup, signupSchema } from 'libs/shared/src/schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { SERVICES } from '@shared/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        dbName: configService.get('MONGO_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
    MongooseModule.forFeature([
      {
        name: signup.name,
        schema: signupSchema,
      },
    ]),
    // jwt congiuration
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('1d'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
