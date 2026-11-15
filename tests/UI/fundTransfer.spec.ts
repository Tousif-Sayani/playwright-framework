import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { FundTransferPage } from '../../pages/FundTransferPage'
test('Verify successful fund transfer', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const fundTransferPage = new FundTransferPage(page);

    await page.goto(process.env.URL!);

    await loginPage.login(
        process.env.CUSTOMER_ID!,
        process.env.PASSWORD!
    );

    await dashboardPage.clickFundsTransfer();

    await fundTransferPage.executeFundTransfer('1');

    await expect(fundTransferPage.successMessage).toBeVisible();

});