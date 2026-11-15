import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Verify user login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto(process.env.URL!);

    await loginPage.login(process.env.CUSTOMERID!, process.env.PASSWORD!);

    // Temporary verification
    await expect(page).toHaveURL('https://playwrightpad.in/sandbox/banking');
});