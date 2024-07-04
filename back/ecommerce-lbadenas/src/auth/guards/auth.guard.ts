import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

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

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Error al validar token');
    }
  }
}
