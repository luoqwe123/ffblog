import { inject } from "vue"


export  function useFormItem(){
    const form =inject("form",void 0)
    const formItem = inject("formItem",void 0)
    return { form , formItem }
}

