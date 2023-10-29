import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from './category.model';
import { Inject, HttpStatus, HttpException } from '@nestjs/common';

export class CategoryService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}

  async getAllCategory() {
    try {
      const data = await this.prisma.category.findMany();

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async getCategoryById(id: number) {
    try {
      const data = await this.prisma.category.findFirst({
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

  async createCategory(payload: Category) {
    try {
      const data = await this.prisma.category.create({ data: payload });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async updateCategory(id: number, payload: Category) {
    try {
      const findData = await this.prisma.category.findFirst({
        where: { id: Number(id) },
      });

      if (!findData) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      const data = await this.prisma.category.update({
        where: { id: Number(id) },
        data: { name: payload.name },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCategory(id: number) {
    try {
      const findData = await this.prisma.category.findFirst({
        where: { id: Number(id) },
      });

      if (!findData) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      await this.prisma.category.delete({
        where: { id: Number(id) },
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
}
