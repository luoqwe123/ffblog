<!-- VirtualScroll.vue -->
<template>
  <div class="virtual-scroll-container" ref="containerRef" @scroll="handleScroll">
    <div class="virtual-scroll-phantom" :style="{ height: `${totalHeight}px` }"></div>
    <div class="virtual-scroll-content" style="width: 100%;height: 100%;display: flex;flex-direction: column;">
      <div class="part2-main" style="width: 100%;height: 100%;display: flex;justify-content: center;">
        <div class="right-article"
          :style="{ transform: `translateY(${offset}px)`, display: 'flex', flexDirection: 'column', }">
          <template v-for="item in visibleItems" :key="item.id">
            <ArticleCover @click="showArticle(item.id)" :style="{ marginTop: 'var(--margin-top)' }"
              :sequential="item.id" :title="item.title" :content="item.content"
              :info="[item.createdAt, item.category.title]" :image="item.image" />
          </template>
        </div>
        <div class="left">
          <slot name="leftAvatar"></slot>
        </div>

      </div>
      <div class="part2-floor" :style="{ transform: `translateY(${offset}px)`}">
        <slot name="floor"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ArticleCover from '@/components/textCover/index.vue';
import type { Article } from './type';

// 定义 Props 并设置默认值
const props = withDefaults(defineProps<{
  items: Article[];
  itemHeight?: number;
  visibleCount?: number;
}>(), {
  items: () => [], // 默认空数组
  itemHeight: 220,
  visibleCount: 4
});

// 定义 Emits
const emit = defineEmits<{
  (e: 'show-article', id: number): void;
}>();

// 响应式数据
const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);

// 计算属性
const totalHeight = computed(() => props.items.length * props.itemHeight);  //数据总高度
const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight));
const endIndex = computed(() =>
  Math.min(startIndex.value + props.visibleCount, props.items.length)
);
console.log(props.items)
const visibleItems = computed(() => {
  // 确保 props.items 是数组
  return Array.isArray(props.items)
    ? props.items.slice(startIndex.value, endIndex.value)
    : [];
});
console.log("arr", visibleItems.value)
const offset = computed(() => startIndex.value * props.itemHeight);

// 方法
const handleScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop;
  }
};

const showArticle = (id: number) => {
  emit('show-article', id);
};

// 生命周期钩子
onMounted(() => {
  if (containerRef.value) {
    containerRef.value.style.height = `${props.visibleCount * props.itemHeight}px`;
  }
});
</script>

<style lang="scss" scoped>
.virtual-scroll-container {
  overflow-y: auto;
  position: relative;
  width: 100%;
}

.virtual-scroll-phantom {
  width: 100%;
}

.virtual-scroll-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>