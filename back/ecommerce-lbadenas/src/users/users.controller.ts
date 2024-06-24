import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users') // Define la ruta a /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query(`page`) page: string, @Query(`limit`) limit: string) {
    !page ? (page = `1`) : page;
    !limit ? (limit = `5`) : limit;
    if (page && limit)
      return this.usersService.getUsers(Number(page), Number(limit));
  }

  @Get(`:id`)
  @UseGuards(AuthGuard)
  getUser(@Param(`id`) id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  addUser(@Body() user: any) {
    //validacion se va ahacer ocn un DTO
    return this.usersService.addUser(user);
  }

  @Put(`:id`)
  @UseGuards(AuthGuard)
  updateUser(@Param(`id`) id: string, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(`:id`)
  @UseGuards(AuthGuard)
  deleteUser(@Param(`id`) id: string) {
    return this.usersService.deleteUser(id);
  }
}
