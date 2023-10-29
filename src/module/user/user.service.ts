import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './user.model';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getAllUser() {
    try {
      const data = await this.prisma.user.findMany();

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: number) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (!data) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(payload: User) {
    try {
      payload.password = await hash(payload.password, 10);
      const data = await this.prisma.user.create({ data: payload });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: number, payload: User) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (!data) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      const newData = await this.prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          username: payload.username,
          email: payload.email,
          bio: payload.bio,
        },
      });

      delete newData.password;
      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: newData,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(id: number, payload: User) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (!data) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      const password = await hash(payload.password, 10);
      await this.prisma.user.update({
        where: { id: Number(id) },
        data: { password: password },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: id,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: number) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      });

      if (!data) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      await this.prisma.user.delete({ where: { id: Number(id) } });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: id,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
