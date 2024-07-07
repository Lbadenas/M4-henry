import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from 'src/dto/users.dto.ts';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuards } from 'src/auth/guards/roles.guard';

@Controller('users') // Define la ruta a /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuards)
  getUsers(@Query(`page`) page: string, @Query(`limit`) limit: string) {
    !page ? (page = `1`) : page;
    !limit ? (limit = `5`) : limit;
    if (page && limit)
      return this.usersService.getUsers(Number(page), Number(limit));
  }

  @Get(`:id`)
  @UseGuards(AuthGuard)
  getUser(@Param(`id`, ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Put(`:id`)
  @UseGuards(AuthGuard)
  updateUser(
    @Param(`id`, ParseUUIDPipe) id: string,
    @Body() user: Partial<CreateUserDto>,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(`:id`)
  @UseGuards(AuthGuard)
  deleteUser(@Param(`id`, ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
