<template>
    
    <div class="drawer">
        <div class="left" @click="close"></div>
        <div class="right">
            <slot></slot>
        </div>
    </div>

</template>

<script setup lang='ts'>
const props = withDefaults(defineProps<{
    close:Function
}>(),{
    
})
const close = ()=>{
    props.close()
   
}

</script>

<style lang="scss" scoped>

.drawer{
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 99;
    display: flex;
    top: 0;
    
}
.left{
    width: 20%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .7);
}
.right{
    width: 80%;
    height: 100%;
    background-color: white;
}
</style>