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
                <BaseForm
                    :validation-schema="signupSchema"
                    :submit-handler="handleSubmit"
                    :submit-text="$t('signup.submit')"
                    :submit-loading-text="$t('signup.submitting')"
                    name="signup-form"
                >
                    <!-- Email Field -->
                    <div class="field-group">
                        <NordFormInput
                            :name="pickField('email')"
                            :label="$t('signup.email')"
                            form="signup-form"
                            type="email"
                            autocomplete="email"
                            required
                            expand
                        />
                    </div>

                    <!-- Password Field -->
                    <div class="field-group">
                        <NordFormInput
                            :name="pickField('password')"
                            :label="$t('signup.password')"
                            form="signup-form"
                            type="password"
                            autocomplete="new-password"
                            required
                            expand
                        />
                    </div>

                    <!-- Accept Updates Checkbox -->
                    <div class="field-group">
                        <NordFormCheckbox
                            :name="pickField('acceptUpdates')"
                            :label="$t('signup.productUpdates')"
                            :hint="$t('signup.productUpdatesHint')"
                        />
                    </div>
                </BaseForm>
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
import { useAuthStore } from '~/stores/auth'
import { signupSchema } from '~/schemas/signup'
import { useZodFieldPicker } from '~/composables/useZodFieldPicker'
import BaseForm from '~/components/forms/BaseForm.vue'
import NordFormInput from '~/components/forms/NordFormInput.vue'
import NordFormCheckbox from '~/components/forms/NordFormCheckbox.vue'
import type { SignupFormData } from '~/schemas/signup'

// Set page meta
useSeoMeta({
    title: 'Sign Up - VetCare',
    description: 'Join thousands of veterinary professionals with VetCare',
})

const authStore = useAuthStore()

// Use the field picker for type-safe field names
const { pickField } = useZodFieldPicker(signupSchema)

// Handle form submission
const handleSubmit = async (values: SignupFormData) => {
    try {
        await authStore.signUp(values)
        // Navigate to success page on success
        await navigateTo('/success')
    } catch (error) {
        // vee-validate will handle the error display
        console.error('Signup failed:', error)
    }
}

// Redirect if already signed up
watchEffect(() => {
    if (authStore.isSignedUp) {
        navigateTo('/success')
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

.footer {
    text-align: center;
    margin-top: var(--n-space-l);

    p {
        font-size: var(--n-font-size-s);
        color: var(--n-color-text-weaker);
    }
}
</style>
