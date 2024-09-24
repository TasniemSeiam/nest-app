import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor( private _JwtService:JwtService ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException("must login first");
    }

    try {
      const payload = this._JwtService.verify(token, {
        secret: process.env.JWT_SECRET
      });

      req.user = payload;


    } catch (error) {
      throw new ForbiddenException("invalid token");
    }
    return true;

  }
}
