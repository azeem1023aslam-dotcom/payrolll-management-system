import { ACTIVITY_LOG_METADATA } from './../lib/activityLog.decorator';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ActivityLogInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private activityClient: ClientProxy
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const action = this.reflector.get<string>(
      ACTIVITY_LOG_METADATA,
      context.getHandler()
    );

    return next.handle().pipe(
      tap(() => {
        if (!action) return;

        const req = context.switchToHttp().getRequest();
        const user = req.user;
        console.log(user,'useruseruser');
        
        const payload = {
          userId: user?.userId,
          action,
          message:`${user.name} performed ${action}`,
          timestamp: new Date(),
        };
        try {
          this.activityClient.emit('create_activity_log', payload);
          console.log('EVENT SENT successfully');
        } catch (e) {
          console.log('EVENT SEND ERROR failed:', e);
        }
      })
    );
  }
}
