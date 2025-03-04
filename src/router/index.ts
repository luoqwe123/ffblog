import { createRouter, createWebHistory } from "vue-router";
import  { constant } from "./router"
 
const router = createRouter({
    history: createWebHistory(),
    routes:constant,
})

export default router


