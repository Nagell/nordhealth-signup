import { defineStore } from 'pinia'
import { signupSchema, type SignupFormData } from '~/schemas/signup'

interface AuthState {
    user: {
        email: string
        acceptUpdates: boolean
    } | null
    isLoading: boolean
    isSignedUp: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isLoading: false,
        isSignedUp: false,
    }),

    actions: {
        setLoading(loading: boolean) {
            this.isLoading = loading
        },

        async signUp(formData: SignupFormData) {
            this.setLoading(true)

            try {
                // Validate form data
                const validatedData = signupSchema.parse(formData)

                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Set user data (in a real app, this would come from API response)
                this.user = {
                    email: validatedData.email,
                    acceptUpdates: validatedData.acceptUpdates,
                }

                this.isSignedUp = true
            } catch (error) {
                // Re-throw error for form to handle
                throw error
            } finally {
                this.setLoading(false)
            }
        },

        resetSignup() {
            this.user = null
            this.isSignedUp = false
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.user,
    },
})
