


import {  PrismaClient } from "@prisma/client"
import {
    registerDecorator,
    ValidationArguments, 
    ValidationOptions,

} from "class-validator"

export function IsNotExistsRule(
    //表 名
    table: string,  //这个参数意味着你要比对的是哪一张表，为user的话意味着与数据库中的user这个表里的数据进行比对
    //该为一个库，用于添加文字等属性
    validationOptions?: ValidationOptions,
) {
    return function (object: Record<string, any>, propretyName: string) {
        registerDecorator({
            name: 'IsNotExistsRule',
            target: object.constructor,
            propertyName: propretyName,
            constraints: [table],
            options: validationOptions,
            validator: {
                async validate(value:String,args:ValidationArguments){
                    const prisma =  new PrismaClient()
                    const user = await prisma[table].findFirst({
                        where:{
                            [propretyName]:value //propretyName 是一个变量，得用中括号括起来
                        }
                    })
                   return !Boolean(user)
                }
            }
        })
    }
}