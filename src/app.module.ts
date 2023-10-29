import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// Module
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { CategoryModule } from './module/category/category.module';
import { UploadModule } from './module/upload/upload.module';
import { ArticleModule } from './module/article/article.module';

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
