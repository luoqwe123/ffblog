import { createApp } from "vue";
import Message from "./Message.vue";
export const  FfMessage = (props:any,callback?:any)=>{
    let div = document.createElement('div')
    div.style.transition = "all 1s esae"
    const message = createApp(Message,{
        ...props,
        close
    })
    open()
    setTimeout(close,2000)
    function open(){
        message.mount(div)
        document.body.appendChild(div)
    }
    
    function close(){
        message.unmount()
        div.remove()
        typeof callback === "function" && callback()
    }
}