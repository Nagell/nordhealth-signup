import { defineStore } from 'pinia'
import { z } from 'zod'

export const signupSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    acceptUpdates: z.boolean().default(false),
})

export type SignupFormData = z.infer<typeof signupSchema>

interface AuthState {
    user: {
        email: string
        acceptUpdates: boolean
    } | null
    isLoading: boolean
    errors: Record<string, string[]>
    isSignedUp: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isLoading: false,
        errors: {},
        isSignedUp: false,
    }),

    actions: {
        setLoading(loading: boolean) {
            this.isLoading = loading
        },

        setErrors(errors: Record<string, string[]>) {
            this.errors = errors
        },

        clearErrors() {
            this.errors = {}
        },

        async signUp(formData: SignupFormData) {
            this.setLoading(true)
            this.clearErrors()

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
                return { success: true }
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const fieldErrors: Record<string, string[]> = {}
                    error.errors.forEach((err) => {
                        const field = err.path[0] as string
                        if (!fieldErrors[field]) {
                            fieldErrors[field] = []
                        }
                        fieldErrors[field].push(err.message)
                    })
                    this.setErrors(fieldErrors)
                } else {
                    // Handle other types of errors (API errors, network errors, etc.)
                    this.setErrors({
                        general: [
                            'An unexpected error occurred. Please try again.',
                        ],
                    })
                }
                return { success: false }
            } finally {
                this.setLoading(false)
            }
        },

        resetSignup() {
            this.user = null
            this.isSignedUp = false
            this.clearErrors()
        },
    },

    getters: {
        hasErrors: (state) => Object.keys(state.errors).length > 0,
        getFieldErrors: (state) => (field: string) => state.errors[field] || [],
        isAuthenticated: (state) => !!state.user,
    },
})
