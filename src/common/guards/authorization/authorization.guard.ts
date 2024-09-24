import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor( private _Reflector:Reflector ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();
    const userRole = req.user.role;

   const roles= this._Reflector.get('roles',context.getHandler())

    if (!roles.includes(userRole)) {
      throw new UnauthorizedException('Unauthorized');
    }


    return true;
  }
}
