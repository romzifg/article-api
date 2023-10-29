import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthGuard } from 'src/module/auth/guard/auth.guard';
import { ApiKeyGuard } from 'src/module/auth/guard/apikey.guard';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Post()
  async createUser(@Body() postBody: User) {
    return this.userService.createUser(postBody);
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() postBody: User) {
    return this.userService.updateUser(id, postBody);
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Put('password/:id')
  async updatePassword(@Param('id') id: number, @Body() postBody: User) {
    return this.userService.updatePassword(id, postBody);
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
