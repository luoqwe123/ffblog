import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, DefaultValuePipe, SerializeOptions } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('article') 
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post() @HttpCode(200)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get() @HttpCode(200)

  findAll(@Query('page',new DefaultValuePipe(1)) page:number,@Query('row',new DefaultValuePipe(8)) row:number) {
    return this.articleService.findAll(page,row);
  }

  @Get(':id') @HttpCode(200)
  //@SerializeOptions({ strategy:"excludeAll" })
  async findOne(@Param('id') id: string) {
    const  article = await  this.articleService.findOne(+id);
    return new Article(article)
  }
 
  @Patch(':id') @HttpCode(200)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    console.log(updateArticleDto)
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id') @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
