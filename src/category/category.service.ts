import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from './category.model';
import { Inject, HttpStatus, HttpException } from '@nestjs/common';

export class CategoryService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}

  async getAllCategory() {
    const data = await this.prisma.category.findMany();

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: data,
    };
  }

  async getCategoryById(id: number) {
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
  }

  async createCategory(payload: Category) {
    const data = await this.prisma.category.create({ data: payload });

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: data,
    };
  }

  async updateCategory(id: number, payload: Category) {
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
  }

  async deleteCategory(id: number) {
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
  }
}
