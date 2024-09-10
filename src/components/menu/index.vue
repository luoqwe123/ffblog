<template>

    <ul :style="{ backgroundColor, color: TextColor }" style="height: 100%;" class="menu" :class="{vertical:posittion}">
        <template v-for="(item, key) in menuData.menuList" :key="item.path">
            <div v-if="item.display" class="menuSub"  style="display: flex;flex-direction: column;justify-content: center;"
                >
                <menuSub :title="item.meta.title"  style="height: 100%;" @click="jumpRouter(item.path)">
                    <template #icon>
                        <Icon :name="item.icon"></Icon>
                    </template>
                    <template #title>
                        <span style="margin-left: 3px;">{{ item.meta.title }}</span>
                    </template>
                </menuSub>
                <div class="menuKidBox" style="display: none;">
                    
                    <div class="chidren" style="transform: translateX(-76px);color: black;display: flex;flex-direction: column;
                    width: 160px;background-color: aliceblue;min-height: 60px;position: absolute;z-index: 3;top: 80px;"
                        v-if="Array.isArray(menuData.menuList[key].children)">

                        <menuItem v-for="el in menuData.menuList[key].children" style="width: 100%;margin-top: 3px;" @click="jumpRouter(el.path)">
                        <template #icon>
                            <Icon :name="el.icon" fill="black" style="height: 20px;"></Icon>
                        </template>
                        <template #title>
                            <span>{{ el.meta.title }}</span>
                        </template>
                        </menuItem>
                    </div>
                </div>

            </div>

        </template>

    </ul>

</template>

<script setup lang='ts'>
import Icon from "@/components/svgComponent/index.vue"
import menuItem from "@/components/menu/menu-item.vue"
import menuSub from "./menu-sub.vue";
import { useRouter } from "vue-router";
import { computed,ref } from "vue";

const  $router = useRouter()
const menuData = withDefaults(defineProps<{
    menuList: any;
    backgroundColor?: string;
    TextColor?: string;
    defaultOpeneds?: string;
    mode?:'horizontal' | 'vertical';
}>(), {
    backgroundColor: 'black',
    TextColor: 'white',
    defaultOpeneds: '',
    mode:"horizontal"
})
let posittion = ref<boolean>(false)
posittion.value = menuData.mode == "vertical"? true:false
const jumpRouter = (path:any)=>{
   
    $router.push(path)
}

</script>


<style lang="scss" scoped>
.vertical{
    flex-direction: column;
}
.menu {
    display: flex;
}
.menuSub:hover{
    .menuKidBox{
        display: block !important;
    }
}
</style>