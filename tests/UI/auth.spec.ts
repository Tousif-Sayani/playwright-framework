
import { test, expect } from '@playwright/test';

const authFile = './auth/user.json';

test('Authenticate Sauce Demo user', async ({ page }) => {

    // Open Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Verify successful login
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Save authentication state
    await page.context().storageState({
        path: authFile
    });

    console.log('Sauce Demo authentication state saved!');

});
