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
import { ArticleService } from './article.service';
import { CreateArticleDto, EditArticleDto } from './dto/article.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllArticle() {
    return this.articleService.getAllArticle();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getArticle(@Param('id') id: number) {
    return this.articleService.getArticle(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(@Body() payload: CreateArticleDto) {
    return this.articleService.createArticle(payload);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateArticle(
    @Param('id') id: number,
    @Body() payload: EditArticleDto,
  ) {
    return this.articleService.updateArticle(id, payload);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteArticle(@Param('id') id: number) {
    return this.articleService.deleteArticle(id);
  }
}
