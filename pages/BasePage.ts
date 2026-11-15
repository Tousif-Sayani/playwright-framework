import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string | null> {
        return await locator.textContent();
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async selectCustomDropdown(locator: Locator, option: string) {
        await locator.click();
        await this.page.getByText(option, { exact: true }).click();
    }

    async selectNativeDropdown(locator: Locator, option: string) {
        await locator.selectOption({ label: option });
    }
}