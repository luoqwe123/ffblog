import { createApp } from "vue";
import Drawer from "@/components/Drawer/text.vue"


export function FfDrawer(props?:any,callback?:Function){
    let div = document.createElement("div")
    let drawer = createApp(Drawer,{
        ...props,
        close
    })
    open()
    function open(){
        drawer.mount(div)
        document.body.append(div)
    }
    function close(){
        drawer.unmount()
        div.remove()
        typeof callback == "function" && callback()
    }
}