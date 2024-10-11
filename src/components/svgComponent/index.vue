<template>
    <div class="icon-container">
        <i class="icon" >
            <svg :style="{width,height}">
                <use :xlink:href="prefix +'-'+ name" :fill=fill></use>
            </svg>
        </i>
    </div>
</template>

<script setup lang='ts'>

withDefaults(defineProps<{
    prefix?:string;
    name?:string;
    width?:string;
    height?:string;
    fill?:string
}>(),{
    prefix:'#icon',
    name:'milestone',
    width:"18px",
    height:'18px',
    fill:"white",
})
</script>

<style lang="scss" scoped>
.icon-container{
    display: flex;
    align-items: center;
}

</style>