
import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

//文件上传 公共的函数  上传时使用一个聚合装饰器，里面包含拦截器对用户请求的一些文件进行拦截
export function upload(fieldName = 'file', options: MulterOptions = {}) {
    return applyDecorators(UseInterceptors(FileInterceptor(fieldName, options)))
}

//上传类型校验  可以说是过滤器
export function fileterFilter(type: string) {
    return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        if (!file.mimetype.includes(type)) { // 可搜索mime类型的表 
            callback(new UnsupportedMediaTypeException('文件类型错误'), false)
        } else {
            callback(null, true)
        }
    }
}

//图片上传 
export function image(field = 'file'){
  
    return upload(field,{
        limits:Math.pow(1024,2)*2,
        fileterFilter:fileterFilter('image')
    }as MulterOptions)
}
//文档上传 
export function document(field = 'file'){
    return upload(field,{
        limits:Math.pow(1024,2)*5, //限制文件大小
        fileterFilter:fileterFilter('document') //限制文件类型
    }as MulterOptions)
}