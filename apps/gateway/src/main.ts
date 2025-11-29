import { ActivityLogInterceptor } from './../../../libs/shared/src/interceptors/activityLogs.interceptors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RoleBaseGuardsGuard, SERVICES } from '@shared';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);
  // app.useGlobalGuards(new RoleBaseGuardsGuard(app.get(Reflector)));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const activityClient = app.get(SERVICES.ACTIVITY_LOGS);

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(
    new ActivityLogInterceptor(reflector, activityClient)
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Payroll System Gateway API')
    .setDescription('Payroll System Gateway API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.GATEWAY_PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
