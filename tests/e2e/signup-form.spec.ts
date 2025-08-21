import { test, expect } from '@playwright/test'
import {
    fillInput,
    getInputValue,
    clickCheckbox,
    isCheckboxChecked,
    completeSignup,
} from './helpers'

test.describe('Signup Form E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')
    })

    test.describe('Basic Form Functionality', () => {
        test('displays form with all required elements', async ({ page }) => {
            // Check form is visible
            await expect(page.locator('form#signup-form')).toBeVisible()

            // Check all form elements are present
            await expect(page.locator('nord-input#email')).toBeVisible()
            await expect(page.locator('nord-input#password')).toBeVisible()
            await expect(
                page.locator('nord-checkbox#acceptUpdates')
            ).toBeVisible()
            await expect(
                page.locator('nord-button[type="submit"]')
            ).toBeVisible()

            // Check labels
            await expect(page.locator('nord-input#email')).toHaveAttribute(
                'label',
                /email/i
            )
            await expect(page.locator('nord-input#password')).toHaveAttribute(
                'label',
                /password/i
            )
            await expect(
                page.locator('nord-checkbox#acceptUpdates')
            ).toHaveAttribute('label', /product updates/i)
        })

        test('can fill form fields', async ({ page }) => {
            // Fill email
            await fillInput(page, 'nord-input#email', 'test@example.com')
            const emailValue = await getInputValue(page, 'nord-input#email')
            expect(emailValue).toBe('test@example.com')

            // Fill password
            await fillInput(page, 'nord-input#password', 'Password123')
            const passwordValue = await getInputValue(
                page,
                'nord-input#password'
            )
            expect(passwordValue).toBe('Password123')

            // Check updates checkbox
            await clickCheckbox(page, 'nord-checkbox#acceptUpdates')
            const isChecked = await isCheckboxChecked(
                page,
                'nord-checkbox#acceptUpdates'
            )
            expect(isChecked).toBe(true)
        })
    })

    test.describe('Form Validation', () => {
        test('prevents submission with empty email', async ({ page }) => {
            // Try to submit with empty email (after touching the field)
            await fillInput(page, 'nord-input#email', 'test')
            await fillInput(page, 'nord-input#email', '') // Clear it to trigger validation

            // Try to submit form to trigger validation
            await page.locator('nord-button[type="submit"]').click()

            // Should stay on same page (not navigate to success)
            await expect(page).toHaveURL('/')
        })

        test('validates email format', async ({ page }) => {
            // Enter invalid email and try to submit
            await fillInput(page, 'nord-input#email', 'invalid-email')
            await fillInput(page, 'nord-input#password', 'Password123')

            // Try to submit form
            await page.locator('nord-button[type="submit"]').click()

            // Should stay on same page due to validation error
            await expect(page).toHaveURL('/')
        })

        test('validates password requirements', async ({ page }) => {
            // Test short password - form submission should fail
            await fillInput(page, 'nord-input#email', 'test@example.com')
            await fillInput(page, 'nord-input#password', '123')

            // Try to submit - should stay on current page
            const submitButton = page.locator('nord-button[type="submit"]')
            await submitButton.click({ force: true }) // Force click even if disabled

            // Should stay on signup page
            await expect(page).toHaveURL('/')

            // Test password without uppercase - should also fail
            await fillInput(page, 'nord-input#password', 'password123')
            await submitButton.click({ force: true })
            await expect(page).toHaveURL('/')

            // Test valid password - should succeed
            await fillInput(page, 'nord-input#password', 'Password123')
            await submitButton.click()
            await page.waitForURL('/success', { timeout: 10000 })
            await expect(page).toHaveURL('/success')
        })
    })

    test.describe('Password Visibility Toggle', () => {
        test('toggles password visibility', async ({ page }) => {
            const passwordInput = page.locator('nord-input#password')
            const toggleButton = passwordInput.locator('nord-button')

            // Fill password first
            await fillInput(page, 'nord-input#password', 'Password123')

            // Initially password should be hidden
            const initialType = await passwordInput.evaluate((el: any) => {
                return el.shadowRoot?.querySelector('input')?.type
            })
            expect(initialType).toBe('password')

            // Click toggle to show password
            await toggleButton.click()
            const afterToggleType = await passwordInput.evaluate((el: any) => {
                return el.shadowRoot?.querySelector('input')?.type
            })
            expect(afterToggleType).toBe('text')

            // Toggle back to hide
            await toggleButton.click()
            const finalType = await passwordInput.evaluate((el: any) => {
                return el.shadowRoot?.querySelector('input')?.type
            })
            expect(finalType).toBe('password')
        })

        test('shows correct icon states', async ({ page }) => {
            const passwordInput = page.locator('nord-input#password')
            const toggleButton = passwordInput.locator('nord-button')
            const icon = toggleButton.locator('nord-icon')

            // Initially should show "show password" icon
            await expect(icon).toHaveAttribute('name', 'interface-edit-off')

            // After clicking, should show "hide password" icon
            await toggleButton.click()
            await expect(icon).toHaveAttribute('name', 'interface-edit-on')
        })
    })

    test.describe('Product Updates Checkbox', () => {
        test('can toggle updates checkbox', async ({ page }) => {
            // Initially unchecked
            const initialChecked = await isCheckboxChecked(
                page,
                'nord-checkbox#acceptUpdates'
            )
            expect(initialChecked).toBe(false)

            // Click to check
            await clickCheckbox(page, 'nord-checkbox#acceptUpdates')
            const afterClickChecked = await isCheckboxChecked(
                page,
                'nord-checkbox#acceptUpdates'
            )
            expect(afterClickChecked).toBe(true)

            // Click to uncheck
            await clickCheckbox(page, 'nord-checkbox#acceptUpdates')
            const finalChecked = await isCheckboxChecked(
                page,
                'nord-checkbox#acceptUpdates'
            )
            expect(finalChecked).toBe(false)
        })

        test('is optional for form submission', async ({ page }) => {
            // Fill valid credentials without checking updates
            await fillInput(page, 'nord-input#email', 'test@example.com')
            await fillInput(page, 'nord-input#password', 'Password123')

            // Submit form - should succeed
            await page.locator('nord-button[type="submit"]').click()

            // Should navigate to success page
            await page.waitForURL('/success', { timeout: 10000 })
            await expect(page).toHaveURL('/success')
        })
    })

    test.describe('Successful Signup Flow', () => {
        test('completes full signup process', async ({ page }) => {
            // Use helper to complete signup with updates enabled
            await completeSignup(page, 'test@example.com', 'Password123', true)

            // Should display user email
            await expect(page.locator('text=test@example.com')).toBeVisible()

            // Should show that updates will be received
            await expect(page.locator('.updates-status')).toContainText(
                /receive.*updates|enabled/i
            )
        })

        test('shows different message for users without updates', async ({
            page,
        }) => {
            // Fill form without checking updates
            await fillInput(page, 'nord-input#email', 'test2@example.com')
            await fillInput(page, 'nord-input#password', 'Password123')

            // Don't check the updates checkbox
            await page.locator('nord-button[type="submit"]').click()
            await page.waitForURL('/success', { timeout: 10000 })

            // Should show different message about updates
            await expect(page.locator('.updates-status')).toContainText(
                /won't receive|disabled|later /i
            )
        })
    })

    test.describe('Accessibility Features', () => {
        test('has proper ARIA attributes', async ({ page }) => {
            // Check required fields have aria-required
            await expect(page.locator('nord-input#email')).toHaveAttribute(
                'aria-required',
                'true'
            )
            await expect(page.locator('nord-input#password')).toHaveAttribute(
                'aria-required',
                'true'
            )

            // Check form elements have proper labels
            await expect(page.locator('nord-input#email')).toHaveAttribute(
                'label'
            )
            await expect(page.locator('nord-input#password')).toHaveAttribute(
                'label'
            )
            await expect(
                page.locator('nord-checkbox#acceptUpdates')
            ).toHaveAttribute('label')
        })

        test('can navigate using keyboard', async ({ page }) => {
            // Tab through interactive elements
            await page.keyboard.press('Tab') // Resend Email button
            await expect(page.locator('nord-input#email')).toBeFocused()

            await page.keyboard.press('Tab') // Sign Up Another button
            await expect(page.locator('nord-input#password')).toBeFocused()

            await page.keyboard.press('Tab') // First support link
            await expect(page.locator('nord-button').first()).toBeFocused()

            await page.keyboard.press('Tab') // First support link
            await expect(
                page.locator('nord-checkbox#acceptUpdates').first()
            ).toBeFocused()
        })
    })

    test.describe('Responsive Design', () => {
        test('displays correctly on mobile', async ({ page }) => {
            await page.setViewportSize({ width: 375, height: 667 })

            // All elements should still be visible and functional
            await expect(page.locator('form#signup-form')).toBeVisible()
            await expect(page.locator('img[alt="ProVet Cloud"]')).toBeVisible()
            await expect(page.locator('nord-input#email')).toBeVisible()
            await expect(page.locator('nord-input#password')).toBeVisible()
            await expect(
                page.locator('nord-checkbox#acceptUpdates')
            ).toBeVisible()

            // Form should still be functional
            await fillInput(page, 'nord-input#email', 'mobile@example.com')
            const emailValue = await getInputValue(page, 'nord-input#email')
            expect(emailValue).toBe('mobile@example.com')
        })

        test('displays correctly on tablet', async ({ page }) => {
            await page.setViewportSize({ width: 768, height: 1024 })

            // Form container should be properly centered
            await expect(page.locator('.signup-container')).toBeVisible()
            await expect(page.locator('form#signup-form')).toBeVisible()
        })
    })
})
