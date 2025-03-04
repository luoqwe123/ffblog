<template>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      
      <span v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }" @click="changePage(page)">
        {{ page }}
      </span>
      
      <span v-if="showEllipsis">...</span>
      
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['page-changed']);
  const currentPage = ref(1);
  
  const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));
  
  const visiblePages = computed(() => {
    const pages:any = [];
    
    if (totalPages.value <= 4) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage.value <= 3) {
        pages.push(1, 2, 3, 4);
      } else if (currentPage.value >= totalPages.value - 2) {
        pages.push(totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value);
      } else {
        pages.push(currentPage.value - 1, currentPage.value, currentPage.value + 1, currentPage.value + 2);
      }
    }
    
    return pages;
  });
  
  const showEllipsis = computed(() => {
    return totalPages.value > 4 && currentPage.value < totalPages.value - 2;
  });
  
  const changePage = (page:any) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    emit('page-changed', currentPage.value);
  };
  
  watch(() => props.totalItems, () => {
    currentPage.value = 1;
  });
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    margin: 0 10px;
  }
  
  span {
    margin: 0 5px;
    cursor: pointer;
  }
  
  span.active {
    font-weight: bold;
  }
  </style>