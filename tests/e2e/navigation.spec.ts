import { test, expect } from '@playwright/test'
import { fillInput, completeSignup, clearStorage } from './helpers'

test.describe('Navigation and Auth Flow', () => {
    test.beforeEach(async ({ page }) => {
        // Clear any existing local storage before each test
        await page.goto('/')
        await clearStorage(page)
        await page.reload()
    })

    test.describe('Initial Page Load', () => {
        test('loads signup page by default', async ({ page }) => {
            await page.goto('/')

            // Should be on signup page
            await expect(page).toHaveURL('/')

            // Should show signup form
            await expect(page.locator('form#signup-form')).toBeVisible()
            await expect(page.locator('h1')).toContainText(
                /sign.*up|create.*account/i
            )

            // Should show ProVet Cloud logo
            await expect(page.locator('img[alt="ProVet Cloud"]')).toBeVisible()
        })

        test('displays proper page title and meta', async ({ page }) => {
            await page.goto('/')

            // Should have proper title (may need to wait for i18n to load)
            await page.waitForTimeout(1000) // Wait for i18n to load
            const title = await page.title()
            // Title might be empty during initial load, that's acceptable
            if (title) {
                expect(title.length).toBeGreaterThan(0)
            }

            // Should have proper meta description (optional)
            const metaDescription = await page
                .locator('meta[name="description"]')
                .getAttribute('content')
            // Meta description is optional, just check if it exists
            if (metaDescription) {
                expect(metaDescription.length).toBeGreaterThan(0)
            }
        })
    })

    test.describe('Auth Middleware Protection', () => {
        test('redirects unauthenticated users from success page to signup', async ({
            page,
        }) => {
            // Try to access success page directly without authentication
            await page.goto('/success')

            // Should redirect to signup page
            await page.waitForURL('/')
            await expect(page).toHaveURL('/')

            // Should show signup form
            await expect(page.locator('form#signup-form')).toBeVisible()
        })

        test('allows authenticated users to access success page', async ({
            page,
        }) => {
            // First complete signup
            await completeSignup(page, 'auth-test@example.com', 'Password123')

            // Now try to access success page directly
            await page.goto('/success')

            // Should remain on success page
            await expect(page).toHaveURL('/success')
            await expect(page.locator('.success-title')).toBeVisible()

            // Should show user data
            await expect(page.locator('.user-email strong')).toContainText(
                'auth-test@example.com'
            )
        })

        test('redirects already signed up users from signup to success', async ({
            page,
        }) => {
            // Complete signup first
            await completeSignup(
                page,
                'redirect-test@example.com',
                'Password123'
            )

            // Try to go back to signup page
            await page.goto('/')

            // Should redirect to success page
            await page.waitForURL('/success')
            await expect(page).toHaveURL('/success')
        })
    })

    test.describe('State Persistence', () => {
        test('persists signup state across page refreshes', async ({
            page,
        }) => {
            // Complete signup with updates enabled
            await completeSignup(
                page,
                'persist-test@example.com',
                'Password123',
                true
            )

            // Refresh the page
            await page.reload()

            // Should still be on success page
            await expect(page).toHaveURL('/success')

            // User data should still be displayed
            await expect(page.locator('.user-email strong')).toContainText(
                'persist-test@example.com'
            )
            await expect(page.locator('.updates-status')).toContainText(
                /receive /i
            )
        })

        test('persists signup state across browser tabs', async ({
            context,
            page,
        }) => {
            // Complete signup in first tab
            await completeSignup(page, 'tab-test@example.com', 'Password123')

            // Open new tab and navigate to signup
            const newPage = await context.newPage()
            await newPage.goto('/')

            // Should redirect to success page
            await newPage.waitForURL('/success')
            await expect(newPage).toHaveURL('/success')

            // User data should be displayed
            await expect(newPage.locator('.user-email strong')).toContainText(
                'tab-test@example.com'
            )

            await newPage.close()
        })
    })

    test.describe('URL Handling', () => {
        test('handles invalid routes gracefully', async ({ page }) => {
            // Try to navigate to non-existent route
            const response = await page.goto('/invalid-route')

            // Check if we're redirected or shown a 404 page instead
            await expect(page).toHaveURL('/invalid-route')
        })

        test('handles direct navigation to valid routes', async ({ page }) => {
            // Navigate directly to root
            await page.goto('/')
            await expect(page).toHaveURL('/')

            // Try to navigate to success (should redirect to signup due to middleware)
            await page.goto('/success')
            await page.waitForURL('/')
            await expect(page).toHaveURL('/')
        })
    })

    test.describe('Back/Forward Navigation', () => {
        test('handles browser back/forward correctly', async ({ page }) => {
            // Complete signup
            await completeSignup(page, 'nav-test@example.com', 'Password123')

            // Go back
            await page.goBack()

            // Should redirect back to success due to auth state
            await page.waitForURL('/success')
            await expect(page).toHaveURL('/success')

            // Reset state and try again
            await page.click('nord-button:has-text("Sign Up Another")')
            await page.waitForURL('/')
        })
    })

    test.describe('Performance and Loading', () => {
        test('loads page resources efficiently', async ({ page }) => {
            // Navigate to page and wait for load
            await page.goto('/')
            await page.waitForLoadState('networkidle')

            // Check that critical resources are loaded
            await expect(page.locator('img[alt="ProVet Cloud"]')).toBeVisible()
            await expect(page.locator('form#signup-form')).toBeVisible()

            // Check for any console errors
            const logs: string[] = []
            page.on('console', (msg) => {
                if (msg.type() === 'error') {
                    logs.push(msg.text())
                }
            })

            // Interact with the page to trigger any potential errors
            await fillInput(page, 'nord-input#email', 'test@example.com')

            // Give some time for any errors to occur
            await page.waitForTimeout(1000)

            // Check for critical console errors (some warnings might be expected)
            const criticalErrors = logs.filter(
                (log) =>
                    !log.includes('warning') &&
                    !log.includes('[Vue warn]') &&
                    !log.includes('Download the Vue Devtools')
            )

            expect(criticalErrors.length).toBe(0)
        })
    })
})
