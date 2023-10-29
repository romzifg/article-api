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
import { AuthGuard } from 'src/module/auth/guard/auth.guard';
import { ApiKeyGuard } from 'src/module/auth/guard/apikey.guard';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Get()
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Post()
  async createCategory(@Body() postData: Category) {
    return this.categoryService.createCategory(postData);
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() postData: Category) {
    return this.categoryService.updateCategory(id, postData);
  }

  @UseGuards(AuthGuard, ApiKeyGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
