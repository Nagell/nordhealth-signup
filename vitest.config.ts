// eslint-disable-next-line import/namespace
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        // increased timeout for e2e tests
        testTimeout: 60000,
        // Exclude E2E tests from vitest - they should run with Playwright
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/tests/e2e/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
        ]
    }
})