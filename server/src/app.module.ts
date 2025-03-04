import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';



@Module({
  imports: [AuthModule, PrismaModule, CategoryModule, ArticleModule, ConfigModule.forRoot({
    isGlobal: true
  }), UploadModule],

})
export class AppModule { }
