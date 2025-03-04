


import { findCategory, getCategory } from "@/api/category";
import { defineStore } from "pinia";
export const categoryStore = defineStore("category",{
    state:()=>({

    }),
    actions:{
        async getCategorys(){
            let res = await getCategory()
            
            return res.data.code?Promise.resolve(res?.data):Promise.reject("获取失败")
        },
        async getOneCategory(id:number){
            let res = await findCategory(id)
           
            return res.data.code?Promise.resolve(res?.data):Promise.reject("获取失败")
        }
    }
})