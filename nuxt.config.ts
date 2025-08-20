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
    css: ['~/assets/css/main.css'],
})
