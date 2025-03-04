<template>
    <div v-if="props.modelValue" class="drawer-container">

        <div class="blackFog"  @click="closeDrawer()"></div>

        <div class="drawer" :class="{ open: t }" @click.stop>
            <slot name="avater"></slot>
            <slot name="com"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true,
    },

});

let t = ref(false)

watch(
    () => props.modelValue,
    () => {
        if (props.modelValue) {
            setTimeout(() => {

                t.value = true;

            }, 0)
        }
    }
)


watch(
    () => t.value,
    () => {
        console.log(t.value)
    }

)
const emit = defineEmits(['update:modelValue']);


const closeDrawer = () => {
    t.value = false
    setTimeout(()=>{
        emit('update:modelValue', false);
    },240)
   

};



</script>

<style scoped>
.drawer-container {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);  
    display: flex;
    overflow:auto;

}

.blackFog {
    width: 20%;
}

.drawer {
    background: white;
    width: 80%;
    height: 100%;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    transition: all .24s ;
    transform: translateX(99%);
    
}


.open{
    transform: translateX(0) !important;
}
</style>