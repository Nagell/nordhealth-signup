// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    ssr: false,
    nitro: {
        preset: 'static',
    },
    modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint', '@nuxtjs/i18n'],
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
    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en.json',
            },
        ],
        defaultLocale: 'en',
    },
    vite: {
        optimizeDeps: {
            include: ['@nordhealth/components'],
        },
        vue: {
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('-'),
                },
            },
        },
    },
})
