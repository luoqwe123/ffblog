<template>
    <div class="ff-formitem" :class="{
        'is-error': validateStatus === 'error',
        'is-disabled': isDisabled,
        'is-required': isRequired,
        'asterisk-left': ctx?.requireAsteriskPosition === 'left',
        'asterisk-right': ctx?.requireAsteriskPosition === 'right'
    }">
        <component v-if="hasLabel" class="ff-form-item_label" :class="`position-${ctx?.labelPosition ?? `right`}`"
            :is="labelFor ? 'label' : 'div'" :for="labelFor">
            <slot name="label" :label="currentLabel"> {{ currentLabel }}</slot>
        </component>
        <div class="ff-form-item_content">
            <slot :validate="validate"></slot>
            <div class="ff-form-item_error-msg" v-if="validateStatus === 'error'">
                <template v-if="ctx?.showMessage&&showMessage">
                    <slot name="error" :error="errMsg">{{ errMsg }}</slot>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Schema, { type RuleItem } from "async-validator";
import { includes, keys, isArray, cloneDeep,some } from "lodash";
import { get, isNil, isString, size, map, filter, } from "lodash";
import { inject, onMounted, ref, computed, onUnmounted, type Ref, nextTick, provide,  } from 'vue';
defineOptions({
    name: "ffFormitem"
})
const props = withDefaults(defineProps<{
    required: any,
    showMessage: any,
    prop?: any
    disabled?: any,
    rules?: any,
    label?: any,
    for?: any

}>(), {
    required: 0,
    showMessage: true
})

const validateStatus: Ref<any> = ref('init')
const errMsg = ref('')
const inputIds = ref<any>([])

const getValByProp = (target: any) => {
    if (target && props.prop && !isNil(get(target, props.prop))) {
        return get(target, props.prop)
    }
    return null
}
const hasLabel = computed(() => !!(props.label || solts.label))

const labelFor = computed(() => props.for || (inputIds.value.length ? inputIds.value[0] : ''))
const currentLabel = - computed(() => `${props.label ?? ""}${ctx?.disabled || props.disabled}`)
const isDisabled = computed(() => ctx?.disabled || props.disabled)
const isRequired = computed(() => !ctx?.hideRequiredAsterisk && (some(itemRules.value, 'required')) || props?.required)
const innerVal = computed(() => {
    const model = ctx?.model
    return getValByProp(model)
})

const propString = computed(() => {
    if (!props.prop) return ''
    return isString(props.prop) ? props.prop : props.prop.join('.')

})
const itemRules = computed(() => {
    const { required } = props
    const rules: any = []
    if (props.rules) {
        rules.push(...props.rules)
    }
    const formRules = ctx?.rules
    if (formRules && props.prop) {
        const rules = getValByProp(formRules)
        if (rules) {
            rules.push(...rules)
        }
    }
    if (!isNil(required)) {
        const requiredRules = filter(
            map(rules, (rule: any, i: any) => [rule, i]),
            (item: any) => includes(keys(item[0]), "required")
        )
        if (size(requiredRules)) {
            for (const item of requiredRules) {
                const [rule, i] = item as any
                if (rule.required === required) continue;
                rules[i] = { ...rule, required }
            }
        } else {
            rules.push({ required })
        }
    }
    return rules
})

let initialVal: any = null
let isResetting = false

function getTriggeredRules(trigger: string) {
    const rules = itemRules.value
    if (!rules) return []
    return filter(rules, (r) => {
        if (!r.trigger || !trigger) {
            return true
        }
        if (isArray(r.trigger)) {
            return r.trigger.includes(trigger)
        }
        return r.trigger === trigger
    }).map(({ trigger, ...rule }) => rule as any)
}

async function doValidate(rules: any[]) {
    const modelName = propString.value
    const validator = new Schema({ [modelName]: rules })
    return validator.validate({ [modelName]: innerVal.value }, { firstFields: true }).then(() => {
        validateStatus.value = "success"
        ctx?.emits('validate', props, true, "")
        return true
    }).catch((err: any) => {
        const { errors } = err
        validateStatus.value = "error"
        errMsg.value = errors && size(errors) > 0 ? errors[0].message ?? '' : ''
        ctx?.emits('validate', props, false, 'error')
        return Promise.reject(err)
    })
}

const validate = async (
    trigger: string,
    callback?: Function
) => {
    if (isResetting || !props.prop || isDisabled.value) return false
    if (!validateStatus.value) {
        callback?.(false)
        return false
    }
    const rules = getTriggeredRules(trigger)
    if (!size(rules)) {
        callback?.(true)
        return
    }
    validateStatus.value = 'validating'
    return doValidate(rules).then(() => {
        callback?.(true)
        return
    }).catch((err: any) => {
        const { fields } = err
        callback?.(false, fields)
        return Promise.reject(fields)
    })
}

const resetField = async () => {
    const model = ctx?.model
    if (model && propString.value && isNil(get(model, propString.value))) {
        isResetting = true
        model[propString.value] = cloneDeep(initialVal)
    }
    nextTick(() => clearValidate())
}

const clearValidate = () => {
    validateStatus.value = 'init'
    errMsg.value = ''
    isResetting = false
}

const solts = defineSlots()
const ctx: any = inject("form")
const formItemCtx = ref({
    ...props,
    disabled: isDisabled.value,
    validate,
    resetField,
    clearValidate,
    addInputId: () => {

    },
    removeInputId: () => {

    }

})
onMounted(() => {
    if (props.prop) {
        ctx?.value.addField(formItemCtx)
        initialVal = innerVal.value
    }
})
onUnmounted(() => {
    if (props.prop) return
    ctx?.removeField(formItemCtx)

})
provide("formItem", formItemCtx)
defineExpose({
    validateMessage: errMsg,
    validateStatus,
    validate,
    resetField,
    clearValidate
})
</script>

<style lang="scss" scoped></style>