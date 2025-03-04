import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma :PrismaService){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data:{
        title:createCategoryDto.title
      }
    })
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findFirst({
      where:{
        id
      },
      include:{
        articles:true
      }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where:{
        id
      },
      data: updateCategoryDto
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where:{
        id
      }
    });
  }
}
