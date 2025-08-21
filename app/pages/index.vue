<template>
    <div class="signup-page">
        <div class="signup-container">
            <!-- Header -->
            <div class="header">
                <div class="logo">
                    <img
                        src="~/assets/images/logo/Provet Cloud_logo_color_RGB.svg"
                        alt="ProVet Cloud"
                        class="logo-image"
                    />
                </div>
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

            <!-- Terms Notice -->
            <div class="terms-notice">
                <p>
                    {{ $t('signup.footer.termsText') }}
                    <NuxtLink to="/">{{
                        $t('signup.footer.termsOfService')
                    }}</NuxtLink>
                    {{ $t('signup.footer.and') }}
                    <NuxtLink to="/">{{
                        $t('signup.footer.privacyPolicy')
                    }}</NuxtLink>
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

const { t } = useI18n()

// Set page meta
useSeoMeta({
    title: t('signup.meta.title'),
    description: t('signup.meta.description'),
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
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--n-space-m);
}

.signup-container {
    width: 100%;
    max-width: 28rem;
}

.header {
    text-align: center;
    margin-bottom: var(--n-space-xl);

    .logo {
        margin: 1.25rem;

        @media (min-width: 768px) {
            margin: 2rem;
        }
    }

    .logo-image {
        height: 1.25rem;
        max-width: 100%;
        object-fit: contain;

        @media (min-width: 768px) {
            height: 2rem;
        }
    }

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

.terms-notice {
    text-align: center;
    margin-top: var(--n-space-l);

    p {
        font-size: var(--n-font-size-s);
        color: var(--n-color-text-weaker);

        a {
            color: var(--n-color-text-link);
            text-decoration: none;

            &:hover {
                color: var(--n-color-text-link-hover);
                text-decoration: underline;
            }
        }
    }
}
</style>
