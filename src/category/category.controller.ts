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
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category | null> {
    return this.categoryService.getCategoryById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createCategory(@Body() postData: Category): Promise<Category> {
    return this.categoryService.createCategory(postData);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() postData: Category,
  ): Promise<Category | null> {
    return this.categoryService.updateCategory(id, postData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
