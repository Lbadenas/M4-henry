import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersService, UsersRepository], //provider llama al servicio y repository
  controllers: [UsersController], //controller llama al controlador
})
export class Usersmodule {} //exporto para luego importar en mi app
