<template>


    <li :style="{display: 'flex',marginRight:margin,alignItems:'center'}" class="options" >
        <slot name="icon"></slot>
        <slot name="title"></slot>
        <Icon name="downIcon" class="icon-container"></Icon>
    </li>


</template>

<script setup lang='ts'>
import { withDefaults } from "vue"
import Icon from "../svgComponent/index.vue"


withDefaults(defineProps<{
    margin?: string;
    title?: string;

}>(), {
    margin: "14px",
    title: "风风"
})


</script>

<style lang="scss" scoped>
.options{
    opacity: 0.8;
    
    cursor: pointer;
}
.options:hover{
    opacity: 1;
    .icon-container{
        transition: transform .3s;
        transform: rotate(180deg);
    }
}


</style>