<template>
    <div class="success-page">
        <div class="success-container">
            <!-- Success Animation / Icon -->
            <div class="success-header">
                <div class="success-icon">
                    <nord-icon name="interface-alert-success" size="xxxl" />
                </div>

                <h1 class="success-title">{{ $t('success.title') }}</h1>

                <div class="success-description">
                    <p class="user-email">
                        {{ $t('success.message') }}
                        <strong>{{ userEmail }}</strong>
                    </p>
                    <p v-if="userAcceptedUpdates" class="updates-status">
                        {{ $t('success.updatesEnabled') }}
                    </p>
                    <p v-else class="updates-status">
                        {{ $t('success.updatesDisabled') }}
                    </p>
                </div>
            </div>

            <!-- Success Card -->
            <nord-card class="next-steps-card">
                <h2 class="card-title">{{ $t('success.nextSteps.title') }}</h2>

                <div class="steps-list">
                    <div class="step-item">
                        <div class="step-number">
                            <span>1</span>
                        </div>
                        <div class="step-content">
                            <h3 class="step-title">
                                {{ $t('success.nextSteps.step1.title') }}
                            </h3>
                            <p class="step-description">
                                {{ $t('success.nextSteps.step1.description') }}
                            </p>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">
                            <span>2</span>
                        </div>
                        <div class="step-content">
                            <h3 class="step-title">
                                {{ $t('success.nextSteps.step2.title') }}
                            </h3>
                            <p class="step-description">
                                {{ $t('success.nextSteps.step2.description') }}
                            </p>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">
                            <span>3</span>
                        </div>
                        <div class="step-content">
                            <h3 class="step-title">
                                {{ $t('success.nextSteps.step3.title') }}
                            </h3>
                            <p class="step-description">
                                {{ $t('success.nextSteps.step3.description') }}
                            </p>
                        </div>
                    </div>
                </div>
            </nord-card>

            <!-- Action Buttons -->
            <div class="action-buttons">
                <nord-button variant="primary" size="l" @click="goToDashboard">
                    {{ $t('common.buttons.getStarted') }}
                </nord-button>

                <nord-button variant="plain" size="l" @click="signUpAnother">
                    {{ $t('common.buttons.signUpAnother') }}
                </nord-button>
            </div>

            <!-- Footer Links -->
            <div class="footer-links">
                <p>
                    {{ $t('success.footer.questions') }}
                    <a href="#" class="support-link">
                        {{ $t('success.footer.contactSupport') }}
                    </a>
                    {{ $t('success.footer.or') }}
                    <a href="#" class="support-link">{{
                        $t('success.footer.helpCenter')
                    }}</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const { t } = useI18n()

// Apply auth middleware
definePageMeta({
    middleware: 'auth',
})

// Set page meta
useSeoMeta({
    title: t('success.meta.title'),
    description: t('success.meta.description'),
})

const authStore = useAuthStore()

// Computed properties for user data
const userEmail = computed(() => authStore.user?.email || '')
const userAcceptedUpdates = computed(
    () => authStore.user?.acceptUpdates || false
)

// Actions
const goToDashboard = () => {
    // In a real app, this would navigate to the main dashboard
    // For now, we'll show an alert
    alert(t('success.alerts.dashboardNavigation'))
}

const signUpAnother = () => {
    // Reset the auth state and go back to signup
    authStore.resetSignup()
    navigateTo('/')
}
</script>

<style scoped lang="scss">
.success-page {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--n-space-m);
}

.success-container {
    width: 100%;
    max-width: 32rem;
    text-align: center;
}

.success-header {
    margin-bottom: var(--n-space-xl);
}

.success-icon {
    margin-bottom: var(--n-space-l);
    color: var(--n-color-status-success);
    animation: slideUp var(--n-transition-slow) ease-out;
}

.success-title {
    font-size: var(--n-font-size-xxxl);
    font-weight: var(--n-font-weight-heading);
    color: var(--n-color-text);
    margin-bottom: var(--n-space-m);
    line-height: var(--n-line-height-xxs);
}

.success-description {
    margin-bottom: var(--n-space-l);

    .user-email {
        font-size: var(--n-font-size-l);
        color: var(--n-color-text);
        margin-bottom: var(--n-space-s);
        line-height: var(--n-line-height-s);

        strong {
            font-weight: var(--n-font-weight-active);
        }
    }

    .updates-status {
        font-size: var(--n-font-size-s);
        color: var(--n-color-text-weaker);
        line-height: var(--n-line-height-s);
    }
}

.next-steps-card {
    padding: var(--n-space-xl);
    margin-bottom: var(--n-space-xl);
    text-align: left;
    animation: slideUp var(--n-transition-slow) ease-out;
    animation-delay: 0.1s;
    animation-fill-mode: both;
}

.card-title {
    font-size: var(--n-font-size-xl);
    font-weight: var(--n-font-weight-active);
    color: var(--n-color-text);
    margin-bottom: var(--n-space-m);
    text-align: center;
}

.steps-list {
    display: flex;
    flex-direction: column;
    gap: var(--n-space-m);
}

.step-item {
    display: flex;
    align-items: flex-start;
    gap: var(--n-space-m);
}

.step-number {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: var(--n-color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    span {
        color: var(--n-color-text-on-accent);
        font-size: var(--n-font-size-s);
        font-weight: var(--n-font-weight-active);
    }
}

.step-content {
    flex: 1;
}

.step-title {
    font-size: var(--n-font-size-m);
    font-weight: var(--n-font-weight-active);
    color: var(--n-color-text);
    margin-bottom: var(--n-space-xs);
    line-height: var(--n-line-height-xs);
}

.step-description {
    font-size: var(--n-font-size-s);
    color: var(--n-color-text-weaker);
    line-height: var(--n-line-height-s);
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--n-space-s);
    margin-bottom: var(--n-space-xl);

    @media (min-width: 640px) {
        flex-direction: row;
        justify-content: center;
        gap: var(--n-space-m);
    }
}

.footer-links {
    margin-top: var(--n-space-xl);

    p {
        font-size: var(--n-font-size-s);
        color: var(--n-color-text-weaker);
        line-height: var(--n-line-height-s);
    }

    .support-link {
        color: var(--n-color-text-link);
        text-decoration: underline;
        transition: all var(--n-transition-quick);

        &:hover {
            text-decoration: none;
        }
    }
}

// Animations
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(var(--n-space-l));
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
