<template>
    <div v-if="visible" class="drawer-container" >
        <div class="blackFog" @click="closeDrawer()"></div>
        <div class="drawer" @click.stop>
            <slot name="com"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true,
    },

});

const emit = defineEmits(['update:modelValue']);

const visible = ref(props.modelValue);

const closeDrawer = () => {
    emit('update:modelValue', false);

};

watch(() => props.modelValue, (newVal) => {
    visible.value = newVal;
});
</script>

<style scoped>
.drawer-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;

}

.blackFog {
    width: 20%;
    background-color: rgba(0, 0, 0, 0.7);
}

.drawer {
    background: black;
    width: 300px;
    height: 100%;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
}
</style>