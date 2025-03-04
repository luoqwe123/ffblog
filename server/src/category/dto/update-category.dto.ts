import { IsNotEmpty } from "class-validator"

export class UpdateCategoryDto {
    @IsNotEmpty({message:"标签标题不能为空"})
    title:string
}
