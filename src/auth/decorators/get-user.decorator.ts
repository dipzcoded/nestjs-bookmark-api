import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
