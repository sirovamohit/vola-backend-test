import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor() { }

  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request & { user: any }>();

    if (request.headers.authorization) {
      try {
        // just call auth user service for token verification
        return true;
      } catch (e) {
        this.logger.error(e);
        throw new UnauthorizedException();
      }
    }

    throw new UnauthorizedException();
  }
}
