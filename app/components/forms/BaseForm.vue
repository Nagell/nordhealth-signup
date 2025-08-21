<template>
    <form :id="name" class="base-form" @submit.prevent="onSubmit">
        <!-- Form fields go here -->
        <slot />

        <!-- Submit section -->
        <div class="form-actions">
            <nord-button
                type="submit"
                variant="primary"
                :disabled="!isSubmitEnabled"
                :loading="isSubmitting"
                expand
            >
                {{ isSubmitting ? submitLoadingText : submitText }}
            </nord-button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { z } from 'zod'

export interface BaseFormProps {
    name?: string
    validationSchema: z.ZodType
    initialValues?: Record<string, any>
    // eslint-disable-next-line no-unused-vars
    submitHandler: (values: any) => Promise<void>
    submitText?: string
    submitLoadingText?: string
    alwaysEnableSubmit?: boolean
}

const props = withDefaults(defineProps<BaseFormProps>(), {
    submitText: 'Submit',
    submitLoadingText: 'Submitting...',
    alwaysEnableSubmit: false,
})

const typedSchema = toTypedSchema(props.validationSchema)

const { handleSubmit, errors, meta, isSubmitting, setFieldTouched } = useForm({
    name: props.name,
    validationSchema: typedSchema,
    validateOnMount: false,
    initialValues: props.initialValues || {},
})

// Computed properties
const isSubmitEnabled = computed(() => {
    if (isSubmitting.value) return false
    if (props.alwaysEnableSubmit) return true
    return meta.value.dirty && Object.keys(errors.value).length === 0
})

// Form submission
const onSubmit = handleSubmit(
    // Valid submit
    async (values) => {
        await props.submitHandler(values)
    },
    // Invalid submit
    async () => {
        // Touch all fields to show validation errors
        Object.keys(errors.value).forEach((field) => {
            setFieldTouched(field, true)
        })

        // Focus first invalid field
        focusFirstInvalidField()
    }
)

// Focus management
function focusFirstInvalidField() {
    const firstInvalidField = Object.keys(errors.value)[0]
    if (!firstInvalidField) return

    // Try different selectors to find the field
    const selectors = [
        `[data-form-field="${firstInvalidField}"] input`,
        `[data-form-field="${firstInvalidField}"] select`,
        `[data-form-field="${firstInvalidField}"]`,
        `#${firstInvalidField}`,
        `[name="${firstInvalidField}"]`,
    ]

    setTimeout(() => {
        for (const selector of selectors) {
            const element = document.querySelector(selector) as HTMLElement
            if (element) {
                element.focus()
                break
            }
        }
    }, 50)
}

// Expose form methods
defineExpose({
    errors,
    meta,
    isSubmitting,
})
</script>

<style scoped lang="scss">
.base-form {
    display: flex;
    flex-direction: column;
}

.form-actions {
    margin-top: var(--n-space-xl);
}
</style>
