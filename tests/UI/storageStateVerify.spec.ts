
import { test, expect } from '@playwright/test';

test.use({
    storageState: './auth/user.json'
});

test('Verify Sauce Demo Storage State', async ({ page }) => {

    // Open Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // Verify Products page without login
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Verify Products heading
    await expect(
        page.getByText('Products', { exact: true })
    ).toBeVisible();

    console.log('Storage State verified successfully!');

});
