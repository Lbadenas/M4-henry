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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users') // Define la ruta a /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuards)
  getUsers(@Query(`page`) page: string, @Query(`limit`) limit: string) {
    !page ? (page = `1`) : page;
    !limit ? (limit = `5`) : limit;
    if (page && limit)
      return this.usersService.getUsers(Number(page), Number(limit));
  }
  @ApiBearerAuth()
  @Get(`:id`)
  @UseGuards(AuthGuard)
  getUser(@Param(`id`, ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('test')
  getTest() {
    return 'Ruta de test para rol user';
  }

  @ApiBearerAuth()
  @Put(`:id`)
  @UseGuards(AuthGuard)
  updateUser(
    @Param(`id`, ParseUUIDPipe) id: string,
    @Body() user: Partial<CreateUserDto>,
  ) {
    return this.usersService.updateUser(id, user);
  }
  @ApiBearerAuth()
  @Delete(`:id`)
  @UseGuards(AuthGuard)
  deleteUser(@Param(`id`, ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
