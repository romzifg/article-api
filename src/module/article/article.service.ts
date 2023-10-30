import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto, EditArticleDto } from './dto/article.dto';

export class ArticleService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getAllArticle(userId: number) {
    try {
      const data = await this.prisma.article.findMany({
        where: { authorId: Number(userId) },
        include: {
          author: { select: { firstName: true, lastName: true } },
          categories: { select: { name: true } },
          images: { select: { image_url: true } },
        },
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

  async getArticle(id: number, userId: number) {
    try {
      const data = await this.prisma.article.findFirst({
        where: { id: Number(id), authorId: Number(userId) },
        include: {
          author: { select: { firstName: true, lastName: true } },
          categories: { select: { name: true } },
          images: { select: { image_url: true } },
        },
      });

      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: data,
      };
    } catch (error) {
      if (error['status'] === 404) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async createArticle(payload: CreateArticleDto, userId: number) {
    try {
      const createData = await this.prisma.article.create({
        data: {
          title: payload.title,
          description: payload.description,
          categoryId: payload.categoryId,
          authorId: Number(userId),
        },
        include: {
          author: { select: { firstName: true, lastName: true } },
          categories: { select: { name: true } },
          images: { select: { image_url: true } },
        },
      });

      if (payload.images.length > 0) {
        await Promise.all(
          payload.images.map(async (el: string) => {
            await this.prisma.articleImage.create({
              data: {
                image_url: el,
                articleId: createData.id,
              },
            });
          }),
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: createData,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async updateArticle(id: number, payload: EditArticleDto, userId: number) {
    try {
      const check = await this.prisma.article.findFirst({
        where: { id: Number(id) },
      });

      if (!check) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      const updateData = await this.prisma.article.update({
        where: { id: Number(id), authorId: Number(userId) },
        data: {
          title: payload.title,
          description: payload.description,
          categoryId: payload.categoryId,
          authorId: Number(userId),
        },
        include: {
          author: { select: { firstName: true, lastName: true } },
          categories: { select: { name: true } },
          images: { select: { image_url: true } },
        },
      });

      if (payload.images !== undefined && payload.images.length > 0) {
        await this.prisma.articleImage.deleteMany({
          where: { articleId: Number(id) },
        });

        await Promise.all(
          payload.images.map(async (el: string) => {
            await this.prisma.articleImage.create({
              data: {
                image_url: el,
                articleId: updateData.id,
              },
            });
          }),
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: updateData,
      };
    } catch (error) {
      if (error['status'] === 404) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async deleteArticle(id: number) {
    try {
      const check = await this.prisma.article.findFirst({
        where: { id: Number(id) },
      });

      if (!check) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.prisma.articleImage.deleteMany({
        where: { articleId: Number(id) },
      });

      await this.prisma.article.delete({
        where: { id: Number(id) },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: id,
      };
    } catch (error) {
      if (error['status'] === 404) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
