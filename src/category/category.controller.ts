import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category | null> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() postData: Category): Promise<Category> {
    return this.categoryService.createCategory(postData);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() postData: Category,
  ): Promise<Category | null> {
    return this.categoryService.updateCategory(id, postData);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
