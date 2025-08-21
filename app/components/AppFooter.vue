<template>
    <nord-footer class="app-footer">
        <div class="footer-copyright">
            <p class="footer-text">
                © {{ currentYear }} Nord Health. {{ $t('footer.copyright') }}
            </p>
        </div>
        <div class="footer-links">
            <NuxtLink to="/" class="footer-link">{{
                $t('footer.privacy')
            }}</NuxtLink>
            <span class="footer-separator">•</span>
            <NuxtLink to="/" class="footer-link">{{
                $t('footer.terms')
            }}</NuxtLink>
            <span class="footer-separator">•</span>
            <NuxtLink to="/" class="footer-link">{{
                $t('footer.support')
            }}</NuxtLink>
        </div>
    </nord-footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.app-footer {
    --n-footer-padding-inline: var(--n-space-m);
    --n-footer-background-color: var(--n-color-surface-raised);
    margin-top: auto;

    // Use flexbox layout for nord-footer content
    :deep(.nord-footer) {
        display: flex;
        flex-direction: column;
        gap: var(--n-space-s);

        @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
}

.footer-copyright {
    text-align: center;
    order: 2;

    @media (min-width: 768px) {
        text-align: left;
        order: 1;
        flex: 1;
    }
}

.footer-text {
    font-size: var(--n-font-size-xs);
    color: var(--n-color-text-weaker);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 767px) {
        white-space: normal;
    }
}

.footer-links {
    display: flex;
    align-items: center;
    gap: var(--n-space-xs);
    flex-wrap: wrap;
    justify-content: center;
    order: 1;

    @media (min-width: 768px) {
        justify-content: flex-end;
        order: 2;
        flex-wrap: nowrap;
    }
}

.footer-link {
    font-size: var(--n-font-size-xs);
}

.footer-separator {
    font-size: var(--n-font-size-xs);
    color: var(--n-color-text-weaker);
}
</style>
