<template>
    <div class="signup-page">
        <div class="signup-container">
            <!-- Header -->
            <div class="header">
                <h1>{{ $t('signup.title') }}</h1>
                <p>{{ $t('signup.subtitle') }}</p>
            </div>

            <!-- Signup Form -->
            <nord-card>
                <form
                    id="signup-form"
                    novalidate
                    @submit.prevent="handleSubmit"
                >
                    <!-- Email Field -->
                    <div class="field-group">
                        <nord-input
                            v-model="formData.email"
                            :label="$t('signup.email')"
                            type="email"
                            name="email"
                            autocomplete="email"
                            form="signup-form"
                            required
                            expand
                            :error="getFieldError('email')"
                            @input="handleFieldInput('email')"
                            @blur="handleFieldInput('email')"
                        />
                    </div>

                    <!-- Password Field -->
                    <div class="field-group">
                        <div class="password-field">
                            <nord-input
                                v-model="formData.password"
                                :label="$t('signup.password')"
                                :type="showPassword ? 'text' : 'password'"
                                name="password"
                                autocomplete="new-password"
                                form="signup-form"
                                required
                                expand
                                :error="getFieldError('password')"
                                @input="handleFieldInput('password')"
                                @blur="handleFieldInput('password')"
                            >
                                <nord-button
                                    slot="end"
                                    aria-describedby="password-tooltip"
                                    square
                                    @click="togglePasswordVisibility"
                                >
                                    <nord-icon
                                        v-if="!showPassword"
                                        name="interface-edit-off"
                                    />
                                    <nord-icon
                                        v-else
                                        name="interface-edit-on"
                                    />
                                </nord-button>
                            </nord-input>
                            <nord-tooltip id="password-tooltip">
                                {{ $t('signup.showHidePassword') }}
                            </nord-tooltip>
                        </div>
                    </div>

                    <!-- Accept Updates Checkbox -->
                    <div class="field-group">
                        <nord-checkbox
                            v-model="formData.acceptUpdates"
                            name="acceptUpdates"
                            :label="$t('signup.productUpdates')"
                            :hint="$t('signup.productUpdatesHint')"
                        />
                    </div>

                    <!-- Submit Button -->
                    <div class="submit-group">
                        <nord-button
                            variant="primary"
                            type="submit"
                            :disabled="!canSubmit"
                            :loading="isLoading"
                            expand
                        >
                            {{
                                isLoading
                                    ? $t('signup.submitting')
                                    : $t('signup.submit')
                            }}
                        </nord-button>
                    </div>
                </form>
            </nord-card>

            <!-- Footer -->
            <div class="footer">
                <p>
                    By creating an account, you agree to our
                    <a href="#">Terms of Service</a>
                    and
                    <a href="#">Privacy Policy</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSignupForm } from '~/composables/useSignupForm'
import { useAuthStore } from '~/stores/auth'

// Set page meta
useSeoMeta({
    title: 'Sign Up - VetCare',
    description: 'Join thousands of veterinary professionals with VetCare',
})

const authStore = useAuthStore()
const router = useRouter()

// Use the signup form composable
const {
    formData,
    showPassword,
    isLoading,
    canSubmit,
    getFieldError,
    togglePasswordVisibility,
    handleFieldInput,
    submitForm,
} = useSignupForm()

// Handle form submission
const handleSubmit = async () => {
    const success = await submitForm()

    if (success) {
        // Navigate to success page
        await router.push('/success')
    }
}

// Redirect if already signed up
watchEffect(() => {
    if (authStore.isSignedUp) {
        router.push('/success')
    }
})
</script>

<style scoped lang="scss">
.signup-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--n-space-m);
    background: var(--n-color-surface);
}

.signup-container {
    width: 100%;
    max-width: 28rem;
}

.header {
    text-align: center;
    margin-bottom: var(--n-space-xl);

    h1 {
        margin-bottom: var(--n-space-xs);
    }

    p {
        font-size: var(--n-font-size-xl);
        color: var(--n-color-text-weaker);
    }
}

nord-card {
    padding: var(--n-space-l);
}

.field-group {
    margin-bottom: var(--n-space-l);
}

.password-field {
    position: relative;
}

.submit-group {
    margin-top: var(--n-space-xl);
}

.error-banner {
    margin-top: var(--n-space-m);
}

.footer {
    text-align: center;
    margin-top: var(--n-space-l);

    p {
        font-size: var(--n-font-size-s);
        color: var(--n-color-text-weaker);
    }
}
</style>
