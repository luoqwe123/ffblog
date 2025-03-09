import { ref, onMounted, onUnmounted,  } from 'vue';

export function useScreenSize() {
   
  const isMobile = ref(false);
  const screenWidth = ref(window.innerWidth);
  const screenHeight = ref(window.innerHeight);
  
  // 检测屏幕尺寸
  const checkScreenSize = () => {
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
    
    isMobile.value = screenWidth.value <= 768;
    
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
  });
  
  return { isMobile, screenWidth, screenHeight };
}