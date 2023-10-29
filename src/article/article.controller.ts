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
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from 'src/auth/getUser.decorator';

@Controller('api/v1/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllArticle(@GetUser('id') userId: number) {
    return this.articleService.getAllArticle(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getArticle(@Param('id') id: number, @GetUser('id') userId: number) {
    return this.articleService.getArticle(id, userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(
    @Body() payload: CreateArticleDto,
    @GetUser('id') userId: number,
  ) {
    return this.articleService.createArticle(payload, userId);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateArticle(
    @Param('id') id: number,
    @Body() payload: EditArticleDto,
    @GetUser('id') userId: number,
  ) {
    return this.articleService.updateArticle(id, payload, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteArticle(@Param('id') id: number) {
    return this.articleService.deleteArticle(id);
  }
}
