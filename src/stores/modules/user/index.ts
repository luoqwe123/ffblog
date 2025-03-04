
import { defineStore } from "pinia";
import { login,register } from "@/api/user/index"

export interface data{
    name:string,
    password:string
    password_confirm?:string
}
// export interface loginData{
//     name:string,
//     password:string,
// }
interface state{
    token:string|undefined
}

export const user = defineStore('user',{
    state:():state=>({
        token:""
    }),
    actions:{
        async login(data:data){
            let res  = await login(data)
         
            let code  = res.data.code
            if(code == 200){
                this.token = res.data.token
                return Promise.resolve("登录成功") 
            }
            return  Promise.reject("登录失败")
        },
        async register(data:data){
            
            let res  = await register(data)
            let code  = res.data.code
           
            if(code == 200){
                this.token = res.data.token
                return Promise.resolve("注册成功") 
            }
            return  Promise.reject("注册失败")
        }
    }
})