<template>
    <div class="loading-container">
        <transition name="fade">
            <div  id="loading">加载中...</div>
        </transition>
    </div>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>
#loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #333;
  z-index: 1000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#main-content {
  display: block;
}
</style>