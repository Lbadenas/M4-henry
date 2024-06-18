import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService], //provider llama al servicio
  controllers: [UsersController], //controller llama al controlador
})
export class Usersmodule {} //exporto para luego importar en mi app
