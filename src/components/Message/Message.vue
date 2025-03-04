<template>

    <div class="Message-container" :class="[props.type,t]">
        {{ props.message }}
    </div>



</template>

<script setup lang='ts'>
//命令式组件
import { defineProps, ref } from 'vue';
const props = defineProps({
    message: {
        type: String,
        default: "Success"
    },
    type: {
        type: String,
        default: "success",
        validator: (value: string) => [
            'success',
            'warn',
            'error'
        ].includes(value)
    },
    close: Function
})
let t = ref()
setTimeout(()=>{
    t.value = 'active'
},1)


</script>

<style lang="scss" scoped>
.Message-container {
    width: 300px;
    height: 50px;
    position: fixed;
    top: 0px;
    left: 45%;
    z-index: 99;
    padding-top: 14px;
    border-radius: 5px;
    transition: all .5s ease;
}
.active{
    transform: translateY(50px);
}

.success {
    background-color: #d0ebc1;
    color: #70c646;

}

.warn {
    background-color: #fdf6ec;
    color: #e7a646;
}

.error {
    color: #f67777;
    background-color: #fde6e6;
}


</style>