import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateArticleDto  {

    @IsNotEmpty({message:'标题不能为空'})
    title:string
    @IsNotEmpty({ message:"内容不能为空" })
    content:string
    @IsNotEmpty({message:'请选择栏目'})
    categoryId:number
    file:string
}
