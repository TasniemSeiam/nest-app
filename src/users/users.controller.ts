import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './DTO/createUser.dto';
import { UpdateUser } from './DTO/updateUser.dto';
import { Login } from './DTO/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { Roles } from 'src/common/decorator/roles/roles.decorator';
import { AuthorizationGuard } from 'src/common/guards/authorization/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(
    private _UsersService: UsersService,
    private _AuthService: AuthService,
  ) {}

  @Get()
  @Roles('admin','user')
  @UseGuards(AuthGuard,AuthorizationGuard)
  findAll(): Promise<CreateUser[]> {
    return this._UsersService.findAllUsers();
  }

  @Get(':id')
  @Roles('admin', 'user')
  @UseGuards(AuthGuard,AuthorizationGuard)
  findOne(@Param('id') id: string): Promise<CreateUser> {
    return this._UsersService.findUserById(id);
  }

  @Post('register')
  create(@Body() user: CreateUser): Promise<CreateUser> {
    return this._UsersService.createNewUser(user);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(AuthGuard,AuthorizationGuard)    
  update(
    @Param('id') userId: string,
    @Body() updatedUser: UpdateUser,
  ): Promise<CreateUser> {
    return this._UsersService.updateUser(userId, updatedUser);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard,AuthorizationGuard)
  @HttpCode(204)    
  delete(@Param('id') id: string) {
    return this._UsersService.deleteUser(id);
  }

  @Post('login')
  async login(@Body() user: Login): Promise<{ token: string }> {
    return await this._AuthService.login(user);
  }
}
