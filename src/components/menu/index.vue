<template>

    <ul :style="{ backgroundColor: background, color: TextColor, width: menuWidth, height: menuHeight }" class="menu"
        :class="{ vertical: posittion }">
        <template v-for="(item, key) in menuData.menuList" :key="item.path">
            <div v-if="item.display" class="menuSub"
                style="display: flex;flex-direction: column;justify-content: center;width: 100%;">
                <MenuSub :title="item.meta.title" style="width: 100%;height: 42px;" @click="jumpRouter(item.path, item, key)"
                    :kid="item.children" :IconColor="IconColor">
                    <template #icon>
                        <Icon :name="item.icon" :fill=TextColor></Icon>
                    </template>
                    <template #title>
                        <span style="margin-left: 3px;white-space: nowrap;">{{ item.meta.title }}</span>
                    </template>
                </MenuSub>
                <div class="menuKidBox">

                    <div class="chidren" :class="{ menuItemHorizontal: isComputer, menuItemVertical: !isComputer }"
                        v-if="Array.isArray(menuData.menuList[key].children) && arr[key]">

                        <MenuItem v-for="el in menuData.menuList[key].children" style="width: 100%;margin-top: 3px;"
                            @click="jumpRouter(el.path)">
                        <template #icon>
                            <Icon :name="el.icon" :fill=TextColor style="height: 20px;margin-right: 10px;"></Icon>
                        </template>
                        <template #title>
                            <span>{{ el.meta.title }}</span>
                        </template>
                        </MenuItem>
                    </div>
                </div>

            </div>

        </template>

    </ul>

</template>

<script setup lang='ts'>
import Icon from "@/components/svgComponent/index.vue"
import MenuItem from "@/components/menu/menu-item.vue"
import MenuSub from "./menu-sub.vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { isComputer } from "@/utils/setConstant"



let IconColor = computed(()=>{
    return isComputer.value?'white':'black'
})
let emit = defineEmits(["update:modelValue"])
const $router = useRouter()
const menuData = withDefaults(defineProps<{
    menuList: any;
    background?: string;
    TextColor?: string;
    defaultOpeneds?: string;
    mode?: 'horizontal' | 'vertical';
    menuWidth?: string,
    menuHeight?: string,
    modelValue?: boolean
}>(), {
    menuHeight: '100%',
    menuWidth: '100%',
    TextColor: 'white',
    defaultOpeneds: '',
    mode: "horizontal",
})

let arr = ref<any>([])
for (let i = 0; i < menuData.menuList.length; i++) {
    arr.value.push(false)
}


let posittion = ref<boolean>(false)
posittion.value = menuData.mode == "vertical" ? true : false
const jumpRouter = (path: any, kid?: any, key?: number) => {
    if (!kid||isComputer.value) {
        emit('update:modelValue', false)
        $router.push(path)
    } else {
        if (key) {
            arr.value[key] = !arr.value[key]
        }

    }


}

</script>


<style lang="scss" scoped>
.vertical {
    flex-direction: column;
    justify-content:flex-start !important;
}

.menu {
    display: flex;
    justify-content: center;
}

.menuSub:hover {
    .menuKidBox {
        display: block !important;
    }
}

.menuSub:focus {
    .menuKidBox {
        display: block !important;
    }
}

.menuItemHorizontal {
    transform: translateX(-76px);
    color: black;
    display: flex;
    flex-direction: column;
    width: 160px;
    background-color: aliceblue;
    min-height: 60px;
    position: absolute;
    z-index: 3;
    top: 80px;
}

.menuItemVertical {
    width: 100%
}
</style>