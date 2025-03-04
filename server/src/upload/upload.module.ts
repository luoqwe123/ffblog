import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Module({
  imports:[
    MulterModule.registerAsync({
      useFactory(){
        return {
          storage:diskStorage({
            //文件储存位置
            destination:'uploads',
            //文件名定制
            filename:(req,file,callback)=>{
              //对保存的文件按 日期 + 随机数 + 原来的扩展名 进行重新命名
              const path = Date.now() +'-'+Math.round(Math.random()*1e10)+extname(file.originalname)
              callback(null,path)
            }
          })
        }
      }
    })
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
