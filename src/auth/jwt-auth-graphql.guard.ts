import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { Request } from 'express';

@Injectable()
export class JwtAuthGraphQlGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      req.user = payload;

      return req.user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
