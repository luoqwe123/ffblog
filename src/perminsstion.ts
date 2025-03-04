import  router from '@/router'
import { ref } from 'vue'
export let offMeteor = ref(false)
router.beforeEach((to:any,from:any,next:any)=>{
  
    if(to.path != "/"){
        offMeteor.value = true
    }else{
        offMeteor.value = false
    }
    
    next()
})