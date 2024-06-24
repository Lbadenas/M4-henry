import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define la ruta a /users
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth(); // Simplemente con el return del método alcanza, no tengo que usar req ni res
  }
  @Post('signin')
  signIn(@Body() credentials: any) {
    const { password, email } = credentials;
    return this.authService.signIn(email, password);
  }
}
