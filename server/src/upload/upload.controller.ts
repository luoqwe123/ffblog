import { Controller, Get, Post,HttpCode,UploadedFile,UseInterceptors } from '@nestjs/common';
import { image } from './upload'
//import { TransformInterceptor } from '@/TransformInterceptor';


@Controller('upload')
//@UseInterceptors(new TransformInterceptor)
export class UploadController {
   @Post("image") @HttpCode(200)
   @image()
   image(@UploadedFile() file:Express.Multer.File){
      console.log(file)
      return file
   }
}
