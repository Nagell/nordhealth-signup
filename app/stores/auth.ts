import { defineStore } from 'pinia'
import { signupSchema, type SignupFormData } from '~/schemas/signup'

interface AuthState {
    user: {
        email: string
        acceptUpdates: boolean
    } | null
    token: string | null
    isLoading: boolean
    isSignedUp: boolean
}

export const useAuthStore = defineStore('auth', () => {
    // Persistent state using useLocalStorage
    const user = useLocalStorage<AuthState['user']>('nordhealth_user', null, {
        serializer: {
            read: (v: any) => (v ? JSON.parse(v) : null),
            write: (v: any) => JSON.stringify(v),
        },
    })
    const token = useLocalStorage<string | null>('nordhealth_token', null)
    const isSignedUp = useLocalStorage('nordhealth_isSignedUp', false)

    // Non-persistent loading state
    const isLoading = ref(false)

    // Actions
    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }

    const signUp = async (formData: SignupFormData) => {
        setLoading(true)

        try {
            // Validate form data
            const validatedData = signupSchema.parse(formData)

            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Simulate receiving a JWT token from the API
            const simulatedToken = `jwt.${btoa(
                JSON.stringify({
                    email: validatedData.email,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
                })
            )}.signature`

            // Set user data and token (in a real app, this would come from API response)
            user.value = {
                email: validatedData.email,
                acceptUpdates: validatedData.acceptUpdates,
            }
            token.value = simulatedToken

            isSignedUp.value = true
        } catch (error) {
            // Re-throw error for form to handle
            throw error
        } finally {
            setLoading(false)
        }
    }

    const resetSignup = () => {
        user.value = null
        token.value = null
        isSignedUp.value = false
    }

    // Getters
    const isAuthenticated = computed(() => !!user.value)

    return {
        user: readonly(user),
        token: readonly(token),
        isLoading: readonly(isLoading),
        isSignedUp: readonly(isSignedUp),
        setLoading,
        signUp,
        resetSignup,
        isAuthenticated,
    }
})
