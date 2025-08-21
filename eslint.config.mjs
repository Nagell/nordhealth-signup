// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt(eslintPluginPrettierRecommended, {
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
    },
    languageOptions: {
        parserOptions: {
            parser: '@typescript-eslint/parser',
            extraFileExtensions: ['.vue'],
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
})
