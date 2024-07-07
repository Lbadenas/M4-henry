import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extraer token desde el encabezado
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No se ha enviado el TOKEN');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No se ha enviado el TOKEN');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });

      if (!user) {
        throw new UnauthorizedException('Error al validar token');
      }
      //adjuntar fecha de expiracion

      user.exp = new Date(user.exp * 1000);
      user.roles = user.isAdmin ? [Role.admin] : [Role.user];
      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Error al validar token');
    }
  }
}
