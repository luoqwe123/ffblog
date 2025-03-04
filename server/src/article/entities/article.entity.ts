import { article } from "@prisma/client";
import { Transform } from "class-transformer";
import dayjs from "dayjs";

export class Article {
    @Transform(({value})=>'发布于'+dayjs(value).format("YYYY-MM-DD"))
    createdAt:string
    @Transform(({value})=> '更新于'+dayjs(value).format("YYYY-MM-DD"))
    updateAt:string
    constructor(options:Partial<article>){
        Object.assign(this,options)
    }
}


