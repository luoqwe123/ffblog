<template>
    <div class="header-container  w-full h-[80px]  bg-black bg-opacity-30 ">
        <div class="word  xl:ml-[30px] flex items-center justify-center h-[50px] w-[147px] md:ml-[10px]
         text-white text-[20px] rounded-[7px] " >
            风风的个人博客
        </div>
        <Menu :menuList="constant"  class="menu-container"  backgroundColor="none" v-if="isComputer" ></Menu>
        <SVG name="menu" v-if="!isComputer" @click="showDrawer"></SVG>
        
        <Drawer v-model="drawer">
            <template #com>
                <Menu :menuList="constant"  class="menu-container"  backgroundColor="none" mode="vertical" ></Menu>
            </template>
            
        </Drawer>

    </div>
</template>

<script setup lang='ts'>

import Menu from "@/components/menu/index.vue"
import SVG from "@/components/svgComponent/index.vue"
import { constant } from "@/router/router";
import { isComputer } from "@/utils/setConstant";
//import { FfDrawer } from "../drawer";
import { ref } from "vue";
import Drawer from "@/components/Drawer/index.vue"

let drawer = ref<boolean>(false)
const showDrawer = ()=>{
   drawer.value = true
}


</script>

<style lang="scss" scoped>
.word {
    font-family: 'Font Name', cursive;
    background-color: #3d85c6;
}
.header-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
}
</style>