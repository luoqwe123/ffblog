<template>


    <li :style="{ display: 'flex', marginRight: margin, alignItems: 'center', }" class="options" @click="changeStyle" :class="{column:!isComputer,active:isActive&&!isComputer}" >
        <div class="text" style="display: flex;">
            <slot name="icon"></slot>
            <slot name="title"></slot>
        </div>
        <Icon name="downIcon" :class="{ iconContainer: isComputer }" v-if="info.kid" :fill="IconColor"
            :style="{ transform: `Rotate(${initAngle}deg)`, Transition: 'all .3s' }"></Icon>
    </li>


</template>

<script setup lang='ts'>
import {  ref,  } from "vue"
import Icon from "../svgComponent/index.vue"
import { isComputer } from "@/utils/setConstant";

let info = withDefaults(defineProps<{
    margin?: string;
    title?: string;
    kid?: Object | undefined,
    IconColor?: string
}>(), {
    margin: "14px",
    title: "风风",
    IconColor: "white"
})
let isActive = ref<boolean>(false)
let initAngle = ref(0)
const changeStyle = () => {
    initAngle.value > 0 ? initAngle.value -= 180 : initAngle.value += 180
    isActive.value = !isActive.value
}

</script>

<style lang="scss" scoped>
.active{
    background-color: #7cc6f7;
}
.column{
    justify-content: space-between;
}
.options {
    opacity: 0.8;
    transition: transform .3s;
    cursor: pointer;
    margin-top: 10px;
    padding: 0 5px;
}

.options:hover {
    opacity: 1;

    .iconContainer {

        transform: rotate(180deg) !important;
    }
}
</style>