// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    ssr: false,
    nitro: {
        preset: 'static',
    },
    modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint'],
    typescript: {
        strict: true,
        typeCheck: true,
    },
    app: {
        head: {
            htmlAttrs: {
                class: 'theme-is-vet',
            },
            meta: [{ name: 'theme-color', content: '#1f0849' }],
        },
    },
    vite: {
        optimizeDeps: {
            include: ['@nordhealth/components'],
        },
    },
})
