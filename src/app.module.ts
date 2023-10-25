import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    AuthModule,
    CategoryModule,
    UserModule,
    ArticleModule,
    UploadModule,
  ],
})
export class AppModule {}
