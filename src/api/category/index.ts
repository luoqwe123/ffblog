
import request from "@/utils/request"
import { categoryList } from "./type"

enum API{
    GETCATEGORY_URL = "/category"
}
export const getCategory = ()=>{
    return request.get<any,categoryList>(API.GETCATEGORY_URL)
}
