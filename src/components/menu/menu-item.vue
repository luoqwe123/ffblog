<template>
    <li class="menuItem" style="display: flex;height: 40px;width: 100%;align-items: center;padding-left: 20%;">
        <slot name="icon" ></slot>
        <slot name="title"></slot>
    </li>

</template>

<script setup lang='ts'>
//import { withDefaults } from "vue"

// let info = withDefaults(defineProps<{

//     title?: string;

// }>(), {

//     title: "风风"
// })

</script>

<style lang="scss" scoped>

.menuItem:hover{
    background-color: skyblue;
}

</style>