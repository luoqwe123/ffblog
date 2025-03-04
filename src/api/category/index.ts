
import request from "@/utils/request"
import { categoryList,category } from "./type"

enum API{
    GETCATEGORY_URL = "/category",
    QUERYCATEGORY_URL = "/category/"
}
export const getCategory = ()=>{
    return request.get<any,categoryList>(API.GETCATEGORY_URL)
}
export const findCategory = (id:number)=>{
    return request.get<any,category>(API.QUERYCATEGORY_URL+id)
}
