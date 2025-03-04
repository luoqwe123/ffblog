import { IsNotEmpty } from "class-validator";



export class CreateCategoryDto {
    @IsNotEmpty({message:"标签标题不能为空"})
    title:string
}
