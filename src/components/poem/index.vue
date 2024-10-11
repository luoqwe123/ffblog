<template>
    <div class="Poem-container">
        <div class="title" style="display: flex;">
            <i class="poem-icon" style="display: flex;align-items: center;justify-content: center;">
                <svg style="height: 18px;width: 18px;">
                    <use :xlink:href="'#icon-' + PoemInfo.icon" ></use>
                </svg>
            </i>
            <span style="margin-left: 8px;">公告</span>
        </div>
        <div class="poem-text">
            待到秋来九月八，我花开后百花杀。
            冲天香阵透长安，满城尽带黄金甲。
        </div>
        <div class="poet" style="margin-top: 20px;display: flex;justify-content: end;">
            <span style="margin-right: 3px;">---</span>黄巢
        </div>

    </div>
</template>

<script setup lang='ts'>

const PoemInfo = withDefaults(defineProps<{
    icon?:string,
}>(),{
    icon:"horn"
})
</script>

<style lang="scss" scoped>
.poem-icon{
    animation: enlarge 1s linear infinite;
}
@keyframes enlarge{
    0%{
        transform: scale(1.0);
    }
    50%{
        transform: scale(1.2);
    }
    100%{
        transform: scale(1.0);
    }
}
.Poem-container {
    width: 290px;
    height: 170px;
   
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px rgba(0, 0, 0, 0.1) solid;
    border-radius: 10px;
    padding: 16px 10px;
}

.poem-text {
    font-family: 'Font Name', cursive;
    line-height: 32px;
}
</style>