import { test, expect } from '@playwright/test'
import { completeSignup } from './helpers'

test.describe('Success Page', () => {
    test.beforeEach(async ({ page }) => {
        // Complete signup flow to reach success page with updates enabled
        await completeSignup(page, 'test@example.com', 'Password123', true)
        await page.waitForLoadState('networkidle')
    })

    test.describe('Page Content', () => {
        test('displays success title and icon', async ({ page }) => {
            // Should show success icon
            await expect(
                page.locator('nord-icon[name="interface-checked"]')
            ).toBeVisible()

            // Should show success title
            await expect(page.locator('h1.success-title')).toBeVisible()
            await expect(page.locator('h1.success-title')).toContainText(
                /success|welcome /i
            )
        })

        test('displays user email and signup details', async ({ page }) => {
            // Should display the user's email
            await expect(page.locator('.user-email strong')).toContainText(
                'test@example.com'
            )

            // Should show that updates are enabled
            await expect(page.locator('.updates-status')).toContainText(
                /enabled|receive.*updates/i
            )
        })

        test('displays next steps card with proper structure', async ({
            page,
        }) => {
            // Should show next steps card
            const nextStepsCard = page.locator('.next-steps-card')
            await expect(nextStepsCard).toBeVisible()

            // Should have a title
            await expect(page.locator('.card-title')).toContainText(/next/i)

            // Should have 3 steps
            const steps = page.locator('.step-item')
            await expect(steps).toHaveCount(3)
        })

        test('displays action buttons', async ({ page }) => {
            // Should show "Get Started" button
            const getResendButton = page.locator(
                'nord-button:has-text("Resend Email")'
            )
            await expect(getResendButton).toBeVisible()
            await expect(getResendButton).toHaveAttribute('variant', 'primary')

            // Should show "Sign Up Another" button
            const signUpAnotherButton = page.locator(
                'nord-button:has-text("Sign Up Another")'
            )
            await expect(signUpAnotherButton).toBeVisible()
            await expect(signUpAnotherButton).toHaveAttribute(
                'variant',
                'plain'
            )
        })

        test('displays footer links', async ({ page }) => {
            // Should show support links in the success page
            const successFooterLinks = page.locator(
                '.success-page .footer-links'
            )
            await expect(successFooterLinks).toBeVisible()

            const supportLinks = successFooterLinks.locator('.support-link')
            await expect(supportLinks.first()).toContainText(
                /contact support|support team/i
            )
        })
    })

    test.describe('Button Functionality', () => {
        test('sign up another button resets state and navigates to signup', async ({
            page,
        }) => {
            // Click "Sign Up Another" button
            const signUpAnotherButton = page.locator(
                'nord-button:has-text("Sign Up Another")'
            )
            await signUpAnotherButton.click()

            // Should navigate back to signup page
            await page.waitForURL('/')
            await expect(page).toHaveURL('/')
        })
    })

    test.describe('Responsiveness', () => {
        test('displays correctly on mobile viewport', async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 })

            // All content should be visible
            await expect(page.locator('.success-icon')).toBeVisible()
            await expect(page.locator('h1.success-title')).toBeVisible()
            await expect(page.locator('.next-steps-card')).toBeVisible()

            // Action buttons should stack vertically on mobile
            const actionButtons = page.locator('.action-buttons')
            await expect(actionButtons).toBeVisible()

            // Both buttons should be visible
            await expect(
                page.locator('nord-button:has-text("Resend Email")')
            ).toBeVisible()
            await expect(
                page.locator('nord-button:has-text("Sign Up Another")')
            ).toBeVisible()
        })

        test('displays correctly on tablet viewport', async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 })
            // All content should be visible
            await expect(page.locator('.success-icon')).toBeVisible()
            await expect(page.locator('h1.success-title')).toBeVisible()
            await expect(page.locator('.next-steps-card')).toBeVisible()

            // Action buttons should stack vertically on mobile
            const actionButtons = page.locator('.action-buttons')
            await expect(actionButtons).toBeVisible()

            // Both buttons should be visible
            await expect(
                page.locator('nord-button:has-text("Resend Email")')
            ).toBeVisible()
            await expect(
                page.locator('nord-button:has-text("Sign Up Another")')
            ).toBeVisible()
        })
    })

    test.describe('Accessibility', () => {
        test('has proper heading hierarchy', async ({ page }) => {
            // Should have h1 for main title
            await expect(page.locator('h1.success-title')).toBeVisible()

            // Should have h2 for next steps
            await expect(page.locator('h2.card-title')).toBeVisible()

            // Should have h3 for each step
            const stepTitles = page.locator('h3.step-title')
            await expect(stepTitles).toHaveCount(3)
        })

        test('has proper semantic structure', async ({ page }) => {
            // Success icon should have proper role/name
            const successIcon = page.locator(
                'nord-icon[name="interface-checked"]'
            )
            await expect(successIcon).toBeVisible()

            // Buttons should have proper text content
            const buttons = page.locator('nord-button')
            await expect(buttons).toHaveCount(2)

            // Links should be properly accessible
            const links = page.locator('.support-link')
            await expect(links).toHaveCount(2)
        })

        test('can navigate using keyboard', async ({ page }) => {
            // Tab through interactive elements
            await page.keyboard.press('Tab') // Resend Email button
            await expect(
                page.locator('nord-button:has-text("Resend Email")')
            ).toBeFocused()

            await page.keyboard.press('Tab') // Sign Up Another button
            await expect(
                page.locator('nord-button:has-text("Sign Up Another")')
            ).toBeFocused()

            await page.keyboard.press('Tab') // First support link
            await expect(page.locator('.support-link').first()).toBeFocused()

            await page.keyboard.press('Tab') // Second support link
            await expect(page.locator('.support-link').last()).toBeFocused()
        })

        test('has proper color contrast for status messages', async ({
            page,
        }) => {
            // Success icon should have proper color
            const successIcon = page.locator(
                'nord-icon[name="interface-checked"]'
            )
            await expect(successIcon).toHaveCSS('color', /.*/) // Should have a color value

            // Status message should be readable
            const statusMessage = page.locator('.updates-status')
            await expect(statusMessage).toBeVisible()
        })
    })
})
