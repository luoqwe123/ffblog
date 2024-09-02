<template>
    <div class="header-container  w-full h-[80px]  bg-black bg-opacity-30 ">
        <div class="word  ml-[30px] flex items-center justify-center h-[50px] w-[147px]
         text-white text-[20px] rounded-[7px] " >
            风风的个人博客
        </div>
        <Menu :menuList="constant"  class="menu-container"  backgroundColor="none"></Menu>

    </div>
</template>

<script setup lang='ts'>

import Menu from "@/components/menu/index.vue"
import { constant } from "@/router/router";
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
}
</style>