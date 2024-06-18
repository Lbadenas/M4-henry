import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Define la ruta a /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers(); // Simplemente con el return del método alcanza, no tengo que usar req ni res
  }
}
