import { ref, computed, reactive } from 'vue'
import { useAuthStore, type SignupFormData } from '~/stores/auth'

export const useSignupForm = () => {
    const authStore = useAuthStore()

    // Form state
    const formData = reactive<SignupFormData>({
        email: '',
        password: '',
        acceptUpdates: false,
    })

    // UI state
    const showPassword = ref(false)
    const hasAttemptedSubmit = ref(false)

    // Computed properties
    const isLoading = computed(() => authStore.isLoading)
    const hasErrors = computed(() => authStore.hasErrors)

    const getFieldError = (field: keyof SignupFormData) => {
        const errors = authStore.getFieldErrors(field)
        return errors.length > 0 ? errors[0] : null
    }

    const isFieldValid = (field: keyof SignupFormData) => {
        if (!hasAttemptedSubmit.value) return true
        return !getFieldError(field)
    }

    const canSubmit = computed(() => {
        return (
            formData.email.trim() !== '' &&
            formData.password.trim() !== '' &&
            !isLoading.value
        )
    })

    // Actions
    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value
    }

    const clearFieldError = (field: keyof SignupFormData) => {
        if (authStore.errors[field]) {
            const newErrors = { ...authStore.errors }
            delete newErrors[field]
            authStore.setErrors(newErrors)
        }
    }

    const handleFieldInput = (field: keyof SignupFormData) => {
        if (hasAttemptedSubmit.value && authStore.errors[field]) {
            // Clear field error when user starts typing after an error
            setTimeout(() => {
                clearFieldError(field)
            }, 300)
        }
    }

    const submitForm = async () => {
        hasAttemptedSubmit.value = true
        const result = await authStore.signUp(formData)
        return result.success
    }

    const resetForm = () => {
        Object.assign(formData, {
            email: '',
            password: '',
            acceptUpdates: false,
        })
        showPassword.value = false
        hasAttemptedSubmit.value = false
        authStore.clearErrors()
    }

    return {
        // State
        formData,
        showPassword,
        hasAttemptedSubmit,

        // Computed
        isLoading,
        hasErrors,
        canSubmit,

        // Methods
        getFieldError,
        isFieldValid,
        togglePasswordVisibility,
        clearFieldError,
        handleFieldInput,
        submitForm,
        resetForm,
    }
}
