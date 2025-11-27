import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleBaseGuardsGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Jwt token missing!');
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    const hasRole = requiredRoles.some((role) => decoded.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException(
        `You do not have permission to access this resource. Required role: ${requiredRoles.join(' or ')}`
      );
    }

    return true;
  }
}

