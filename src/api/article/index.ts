
import { articleList, updateArticle, queryArticle,imageTp } from "./type";
import request from "@/utils/request";


enum API {
    ADDARTICLE_URL = "/article",
    REMOVEARTICLE_URL = '/article/',
    REVISEARTICLE_URL = "/article/",
    QUERYARTICLE_URL = "/article/",  //查询参数添加到url上
    GETARTICLE_URL = "/article/?",  //params参数
    UPLOADIMAGE_URL = "/upload/image"
}

export const addArticle = (data: { title: string, content: string, categoryId: number }) => {
    return request.post<any, updateArticle>(API.ADDARTICLE_URL, data)
}
export const removeArticle = (id: number) => {
    return request.delete<any, updateArticle>(API.REMOVEARTICLE_URL + id)
}
export const reviseArticle = (id: number,data:any) => {
    return request.patch<any, updateArticle>(API.REVISEARTICLE_URL + id,data)
}
export const findArticle = (id: number) => {
    return request.get<any, queryArticle>(API.QUERYARTICLE_URL + id)
}
export const getArticle = (page: number, row: number) => {
    return request.get<any, articleList>(API.GETARTICLE_URL + `page=${page}&row=${row}`)
}
export const uploadImage = (file:File)=>{
    let formData = new FormData()    //以form-data的形式上传参数 , form-data适用于上传文件或二进制，x-www-form-urlencoded用于传输键值对
    formData.append('file',file)
    return request.post<any,imageTp>(API.UPLOADIMAGE_URL,formData)
}
