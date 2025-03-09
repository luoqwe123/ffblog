<template>
    <div v-if="props.modelValue" class="drawer-container">

        <div class="blackFog" @click="closeDrawer()"></div>

        <div class="drawer" :class="{ open: t }" @click.stop>
            <slot name="avater"></slot>
            <slot name="com"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch,  watchEffect } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true,
    },

});

let t = ref(false)

watchEffect(()=>{
    if (props.modelValue) {
            setTimeout(() => {
                t.value = true;
            }, 0)
        }
})


watch(
    () => t.value,
    () => {
        console.log(t.value)
    }

)
const emit = defineEmits(['update:modelValue']);


const closeDrawer = () => {
    t.value = false
   
        emit('update:modelValue', false);
  


};



</script>

<style lang="scss" scoped>
.drawer-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    overflow: auto;

}

.blackFog {
    width: 100%;
}

.drawer {
    position: absolute;
    right: 0px;
    background: white;
    width: 400px;
    height: 100%;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    animation: drawer linear .5s ;
   
}
@keyframes drawer{
    from{
        transform: translateX(100%);
    }
    to{
        transform: translateX(0);
    }
}


.open {
    /* transform: translateX(0) !important; */
}
</style>