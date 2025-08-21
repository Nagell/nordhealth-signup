import type { Page, Locator } from '@playwright/test'

/**
 * Helper function to fill Nordhealth shadow DOM inputs
 * Works with nord-input web components that use shadow DOM
 */
export const fillInput = async (
    page: Page,
    selector: string,
    value: string
): Promise<void> => {
    const element = page.locator(selector)
    await element.evaluate((el: any, value: string) => {
        const input = el.shadowRoot?.querySelector('input')
        if (input) {
            input.value = value
            input.dispatchEvent(new Event('input', { bubbles: true }))
            input.dispatchEvent(new Event('blur', { bubbles: true }))
        }
    }, value)
}

/**
 * Helper function to complete signup flow
 * Reusable across multiple tests
 */
export const completeSignup = async (
    page: Page,
    email: string,
    password: string,
    acceptUpdates: boolean = false
): Promise<void> => {
    await page.goto('/')

    await fillInput(page, 'nord-input#email', email)
    await fillInput(page, 'nord-input#password', password)
    if (acceptUpdates) {
        await clickCheckbox(page, 'nord-checkbox#acceptUpdates')
    }

    await page.locator('nord-button[type="submit"]').click()
    await page.waitForURL('/success')
}

/**
 * Helper function to clear browser storage
 * Useful for test setup and cleanup
 */
export const clearStorage = async (page: Page): Promise<void> => {
    await page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
    })
}

/**
 * Helper function to get input value from shadow DOM
 */
export const getInputValue = async (
    page: Page,
    selector: string
): Promise<string> => {
    return await page.locator(selector).evaluate((el: any) => {
        return el.shadowRoot?.querySelector('input')?.value || ''
    })
}

/**
 * Helper function to click checkbox in shadow DOM
 */
export const clickCheckbox = async (
    page: Page,
    selector: string
): Promise<void> => {
    await page.locator(selector).evaluate((el: any) => {
        const input = el.shadowRoot?.querySelector('input')
        if (input) {
            input.click()
        }
    })
}

/**
 * Helper function to check if checkbox is checked
 */
export const isCheckboxChecked = async (
    page: Page,
    selector: string
): Promise<boolean> => {
    return await page.locator(selector).evaluate((el: any) => {
        return el.shadowRoot?.querySelector('input')?.checked || false
    })
}
