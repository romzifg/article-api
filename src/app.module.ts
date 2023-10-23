import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, CategoryModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
