import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';

test.use({
    storageState: './auth/user.json'
});

test('Verify Dashboard', async ({ page }) => {

    const dashboardPage = new DashboardPage(page);

    await page.goto(process.env.URL!);

    await expect(dashboardPage.accountsSummary).toBeVisible();

});