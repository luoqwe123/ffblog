<template>
    <div class="Avatar-container">
        <div class="top">
            <div class="top-picture">
                <img src="../../../public/168.jpg" alt="" class="avatar">
            </div>

            <div class="name">独断万古柳如烟</div>
        </div>
        <div class="center">
            <div @click="go(key)" v-for="(item, key) in avatarInfo.info" :key="key" class="center-link" >
                <div class="headline">{{ item }}</div>
                <div class="length-num">{{ avatarInfo.length[key] }}</div>
            </div>
        </div>
        <div class="bottom">
            <a href="mailto:qwe18173945756@163.com" class="bottom-link" style="background-color: #49b1f5; display: flex;justify-content: center;height: 37px;align-items: center;">
                <i class="icon" style="display: flex;align-items: center;justify-content: center;">
                    <svg style="height: 26px;width: 22px;">
                        <use :xlink:href="'#icon-' + avatarInfo.svgName" fill="#49b1f5"></use>
                    </svg>
                </i>
                <span style="color: white;line-height: 3px;margin-left: 5px;">Contact Me</span>
            </a>

        </div>
        <div class="end" style="display: flex; justify-content: space-around;align-items: center;margin-top: 10px;">
            <a :href=url[key] v-for="(item,key) in avatarInfo.icon" :key="key" style="display: flex;align-items: center;">
                <i class="end-icon" style="display: flex;align-items: center;justify-content: center;">
                    <svg style="height: 28px;width: 28px;">
                        <use :xlink:href="'#icon-' + item" fill="#49b1f5"></use>
                    </svg>
                </i>
            </a>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {  withDefaults } from "vue"
import { useRouter } from "vue-router";
const $router = useRouter()
const avatarInfo = withDefaults(defineProps<{
    info?: any,
    length: any,
    svgName?: string,
    icon?:any,
    url?:any
    labelFn?:Function,
}>(), {
    info: ["文章", "标签"],
    length: [22, 33, 44],
    svgName: "Information",
    icon:["github","gitee"],
    url:["https://github.com/luoqwe123/ffblog","https://gitee.com/dashboard/projects"],
    labelFn: ()=>{ return } ,
})
const go = (key:number)=>{
    key==1&&$router.push("/label")
}
</script>

<style lang="scss" scoped>
.top {
    .top-picture {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .name {
        font-family: 'Font Name', cursive;
        line-height: 40px;
        height: 40px;
        font-size: 30px;
    }
}


    
.bottom-link:hover{
        background-color: #cfdb1d !important;
}
    


.center {
    width: 100%;
    height: 67.66px;
    margin-top: 14px;
    display: flex;
    justify-content: space-around;
}

.headline {
    color: #333231;
}

.length-num {
    font-size: 1.4em;
    color: #1f2d3d;
}

.center-link:hover {

    .headline,
    .length-num {
        color: #3292bb;
        
    }
}

.avatar {

    height: 136px;
    width: 136px;
    border-radius: 50%;
}

.avatar:hover,.end-icon:hover {
    transition: transform .3s;
    transform: rotate(360deg);
}

.Avatar-container {
    width: 290px;
    height: 378px;
   
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px rgba(0, 0, 0, 0.1) solid;
    border-radius: 10px;
    padding: 20px 24px;
}
</style>