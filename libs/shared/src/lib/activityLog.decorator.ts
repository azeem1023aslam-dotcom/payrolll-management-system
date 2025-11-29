import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ACTIVITY_LOG_METADATA = 'activity_log_event';

// Step 1: Decorator Define
export const LogActivity = (action: string) => SetMetadata(ACTIVITY_LOG_METADATA, action);

// Step 2: Current User Extract (optional)
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user,'iruwiruiweuriweuriwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    return request.user;
  }
);