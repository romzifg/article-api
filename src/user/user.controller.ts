import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() postBody: User): Promise<User> {
    return this.userService.createUser(postBody);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() postBody: User,
  ): Promise<User> {
    return this.userService.updateUser(id, postBody);
  }

  @Put('password/:id')
  async updatePassword(
    @Param('id') id: number,
    @Body() postBody: User,
  ): Promise<User> {
    return this.userService.updatePassword(id, postBody);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
