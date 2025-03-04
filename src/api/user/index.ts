import request from "@/utils/request";
import { IloginRes,IregisterRes } from "./type.ts"

enum API{
    LOGIN_URL = "http://localhost:3000/api/login",
    REGISTER_URL = "http://localhost:3000/api/register"
}

// interface data{
//     name:string,
//     password:string
// }
interface data{
    name:string,
    password:string,
    password_confirm?:string
}

export function login(data:data){
    return request.post<IloginRes,any>(API.LOGIN_URL,data)
}
export function register(data:data){
    return request.post<IregisterRes,any>(API.REGISTER_URL,data)
}