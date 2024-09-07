<template>
    <div class="ff-form">
        <slot></slot>

    </div>
</template>

<script setup lang='ts'>
import { ValidateFieldsError } from 'async-validator';
import { filter, includes, size, each } from 'lodash';
import { provide, ref } from 'vue';
const props = withDefaults(defineProps<{
    showMessage: any,
    hideRequiredAsterisk: any,
    requireAsteriskPosition: any,
    labelPosition: any,
}>(), {
    showMessage: true,
    hideRequiredAsterisk: false,
    requireAsteriskPosition: "left",
    labelPosition: "right"
})
const emits = defineEmits()

const fields: any = []

async function doValidateField(fields: any = []) {
    let validateErrors: any = {}
    for (const field of fields) {
        try {
            await field.validate('')
        } catch (error) {
            validateErrors = {
                ...validateErrors,
                ...(error as any)
            }
        }
    }
    if (!size(Object.keys(validateErrors))) return true
    return Promise.reject(validateErrors)

}

const addField = (field: any) => {
    if (!field.prop) return
    fields.push(field)
}
const removeField = (field: any) => {
    if (!field.prop) return
    fields.splice(fields.indexof(field), 1)
}

const validate = (callback: any) => {
    return validateField([], callback)
}
const validateField = async (keys: any, callback: any) => {
    //const filterArr = size(props) ? filter(fields, (field) => includes(props, field.prop)) : fields
    try {
        const result = await doValidateField(filterFields(fields, keys ?? []))
        if (result === true) {
            callback?.(result)
        }
        return result
    } catch (error) {
        if (error instanceof Error) throw error
        const invalidFields = error as ValidateFieldsError
        callback?.(false, invalidFields)
        return Promise.reject(invalidFields)
    }
}
const resetFields = (keys: any) => {
    each(filterFields(fields, keys ?? []), (field) => field.resetField())
}
const clearValidate = (keys: any) => {
    each(filterFields(fields, keys ?? []), (field) => field.clearValidate())
}
const filterFields = (fields: any, keys: any) => {
    return size(keys) ? filter(fields, (field) => includes(keys, field.prop)) : fields
}

const formCtx = ref({
    ...props,
    emits,
    addField,
    removeField,
})
provide("form", formCtx)

defineExpose({
    validate,
    validateField,
    resetFields,
    clearValidate
})
</script>

<style lang="scss" scoped></style>