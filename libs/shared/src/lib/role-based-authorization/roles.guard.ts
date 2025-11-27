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

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // If no roles required, allow access (but still try to attach user if token exists)
    if (!requiredRoles) {
      if (authHeader) {
        try {
          const token = authHeader.split(' ')[1];
          const decoded = this.jwtService.verify(token);
          request.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
          };
        } catch{}
      }
      return true;
    }

    if (!authHeader) {
      throw new UnauthorizedException('Jwt token missing!');
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token);

    // Attach user to request object
    request.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    const hasRole = requiredRoles.some((role) => decoded.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException(
        `You do not have permission to access this resource. Required role: ${requiredRoles.join(' or ')}`
      );
    }

    return true;
  }
}

