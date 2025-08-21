<template>
    <div class="nord-form-input">
        <div v-if="type === 'password'" class="password-field">
            <nord-input
                v-bind="nordInputProps"
                :id="computedId"
                :value="value"
                :error="errorMessage"
                :aria-describedby="ariaDescribedBy"
                :aria-invalid="hasError"
                :aria-required="required"
                @input="handleInput"
                @blur="handleBlur"
            >
                <nord-button
                    slot="end"
                    type="button"
                    :aria-describedby="`${computedId}-password-tooltip`"
                    square
                    @click="togglePasswordVisibility"
                >
                    <nord-icon
                        :name="
                            showPassword
                                ? 'interface-edit-on'
                                : 'interface-edit-off'
                        "
                    />
                </nord-button>
            </nord-input>
            <nord-tooltip :id="`${computedId}-password-tooltip`">
                {{
                    showPassword
                        ? t('common.password.hide')
                        : t('common.password.show')
                }}
            </nord-tooltip>
        </div>

        <nord-input
            v-else
            v-bind="nordInputProps"
            :id="computedId"
            :value="value"
            :error="errorMessage"
            :aria-describedby="ariaDescribedBy"
            :aria-invalid="hasError"
            :aria-required="required"
            @input="handleInput"
            @blur="handleBlur"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useField } from 'vee-validate'

const { t } = useI18n()

export interface NordFormInputProps {
    name: string
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'
    label?: string
    hint?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    expand?: boolean
    size?: 'small' | 'medium' | 'large'
    hideLabel?: boolean
    hideRequired?: boolean
    autofocus?: boolean
    form?: string
    id?: string
    class?: string
}

const props = withDefaults(defineProps<NordFormInputProps>(), {
    type: 'text',
    required: false,
    disabled: false,
    readonly: false,
    expand: false,
    hideLabel: false,
    hideRequired: false,
    autofocus: false,
})

const showPassword = ref(false)

// vee-validate integration
const {
    value,
    errorMessage,
    handleChange,
    handleBlur: veeHandleBlur,
} = useField(() => props.name, undefined, {
    validateOnValueUpdate: false,
})

// Computed properties
const computedId = computed(() => props.id || props.name)
const hasError = computed(() => !!errorMessage.value)
const computedType = computed(() => {
    if (props.type === 'password') {
        return showPassword.value ? 'text' : 'password'
    }
    return props.type
})

const ariaDescribedBy = computed(() => {
    const ids = []
    if (props.hint) ids.push(`${computedId.value}-hint`)
    if (errorMessage.value) ids.push(`${computedId.value}-error`)
    return ids.length > 0 ? ids.join(' ') : undefined
})

// Props to pass to nord-input (excluding our custom ones)
const nordInputProps = computed(() => ({
    label: props.label,
    hint: props.hint,
    placeholder: props.placeholder,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly,
    autocomplete: props.autocomplete,
    expand: props.expand,
    size: props.size,
    hideLabel: props.hideLabel,
    hideRequired: props.hideRequired,
    autofocus: props.autofocus,
    form: props.form,
    class: props.class,
    type: computedType.value,
}))

// Event handlers
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    value.value = target.value
    handleChange(event, !!errorMessage.value)
}

const handleBlur = (event: Event) => {
    veeHandleBlur(event, true)
}

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

// Focus method for external access
const focus = () => {
    const input = document.getElementById(computedId.value) as HTMLInputElement
    input?.focus()
}

// Expose methods for parent components
defineExpose({
    focus,
})
</script>

<style scoped lang="scss">
.nord-form-input {
    position: relative;
}

.password-field {
    position: relative;
}
</style>
