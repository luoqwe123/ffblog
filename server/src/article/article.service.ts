import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Category } from '@/category/entities/category.entity';

//ConfigService 为配置项

@Injectable()
export class ArticleService {

  constructor(private prisma: PrismaService, private config: ConfigService) { }
  async create(data: CreateArticleDto) {


    await this.prisma.article.create({
      data: {
        title: data.title,
        categoryId: +data.categoryId,
        content: data.content,
        image: data.file
      },
    })
    return {
      message: "添加成功"
    }


  }

  async findAll(page = 1, row: number) {

    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * row,
      take: +row,
      include: {
        category: true,   //关联标签项

      }
    });
   
    const count = await this.prisma.article.count()
    const categoryCount = await this.prisma.category.count()
    return {
      meta: {
        current_page: page,
        page_row: row,
        total: count,
        total_page: Math.ceil(count / row),
        categoryTotal:categoryCount
      },
      data: articles
    }
  }

  findOne(id: number) {
    return this.prisma.article.findFirst({
      where: {
        id
      },
      include: {
        category: true
      }
    })
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {

    await this.prisma.article.update({
      where: {
        id
      },
      data: { 
          title:updateArticleDto.title,
          content:updateArticleDto.content,
          categoryId:+updateArticleDto.categoryId,
          image: updateArticleDto.file, 
         }
    });
    return {
      message: "修改成功"
    }
  }

  async remove(id: number) {
    await this.prisma.article.delete({
      where: {
        id
      }
    });
    return {
      message: '删除成功'
    }
  }
}
