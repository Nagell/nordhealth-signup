<template>
    <nord-checkbox
        v-bind="nordCheckboxProps"
        :id="computedId"
        :checked="checked"
        :error="errorMessage"
        :aria-describedby="ariaDescribedBy"
        :aria-invalid="hasError"
        :aria-required="required"
        @change="handleChange"
    />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

export interface NordFormCheckboxProps {
    name: string
    label?: string
    hint?: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    hideLabel?: boolean
    hideRequired?: boolean
    id?: string
    class?: string
}

const props = withDefaults(defineProps<NordFormCheckboxProps>(), {
    required: false,
    disabled: false,
    readonly: false,
    hideLabel: false,
    hideRequired: false,
})

// vee-validate integration
const {
    errorMessage,
    handleChange: veeHandleChange,
    checked,
} = useField(() => props.name, undefined, {
    validateOnValueUpdate: true,
    initialValue: false,
    type: 'checkbox',
    checkedValue: true,
})

// Computed properties
const computedId = computed(() => props.id || props.name)
const hasError = computed(() => !!errorMessage.value)

const ariaDescribedBy = computed(() => {
    const ids = []
    if (props.hint) ids.push(`${computedId.value}-hint`)
    if (errorMessage.value) ids.push(`${computedId.value}-error`)
    return ids.length > 0 ? ids.join(' ') : undefined
})

// Props to pass to nord-checkbox (excluding our custom ones)
const nordCheckboxProps = computed(() => ({
    label: props.label,
    hint: props.hint,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly,
    hideLabel: props.hideLabel,
    hideRequired: props.hideRequired,
    class: props.class,
}))

// Event handlers
const handleChange = (event: Event) => {
    veeHandleChange(event, !!errorMessage.value)
}

// Focus method for external access
const focus = () => {
    const checkbox = document.getElementById(
        computedId.value
    ) as HTMLInputElement
    checkbox?.focus()
}

// Expose methods for parent components
defineExpose({
    focus,
})
</script>
