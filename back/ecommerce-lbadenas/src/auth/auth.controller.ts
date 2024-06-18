import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define la ruta a /users
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth(); // Simplemente con el return del método alcanza, no tengo que usar req ni res
  }
}
