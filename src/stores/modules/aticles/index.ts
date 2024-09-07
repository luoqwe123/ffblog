
import { defineStore } from "pinia";
import { state } from "./type";
import { findArticle, getArticle,addArticle, removeArticle, reviseArticle, uploadImage } from "@/api/article";

export const articleStore = defineStore('article',{
    state:():state =>({
        articleList:[],
        articleMeta:{} ,
        article:{}
    }),
    actions:{
        async getArticleList(page:number,row:number){
            let res = await getArticle(page,row)
            return res?.data.code==200?Promise.resolve(res?.data):Promise.reject("获取失败")
        },
        async queryArticle(id:number){
            let res = await findArticle(id)
            return res?.data.code ==200?Promise.resolve(res?.data):Promise.reject("获取失败")
        },
        async addArticles(data:any){
            let res = await addArticle(data)
           
            return res?.data.code ==200?Promise.resolve(res?.data.data.message):Promise.reject("获取失败")
        },
        async removeArticles(id:number){
            let res = await removeArticle(id)
            return res?.data.code ==200?Promise.resolve(res?.data.data.message):Promise.reject("获取失败")
        },
        async updateArticles(id:number,data:any){
            let res = await reviseArticle(id,data)
            return res?.data.code ==200?Promise.resolve(res?.data.data.message):Promise.reject("获取失败")
        },
        async uploadImages(file:File){
            let res = await uploadImage(file)
            
            return res?.data.code ==200?Promise.resolve(res?.data.data.path):Promise.reject("获取失败")
        }
    },
    getters: {}
})