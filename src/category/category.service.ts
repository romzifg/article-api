import { PrismaService } from 'src/prisma.service';
import { Category } from './category.model';
import { Inject } from '@nestjs/common';

export class CategoryService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}

  async getAllCategory(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findFirst({ where: { id: Number(id) } });
  }

  async createCategory(data: Category): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async updateCategory(id: number, data: Category): Promise<Category> {
    const findData = this.prisma.category.findFirst({
      where: { id: Number(id) },
    });

    if (!findData) {
      return null;
    }

    return this.prisma.category.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id: Number(id) },
    });
  }
}
