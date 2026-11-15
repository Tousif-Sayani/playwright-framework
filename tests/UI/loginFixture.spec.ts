
import { test, expect } from '../../fixtures/testFixtures';

test('Login using Custom Fixture', async ({ pageManager, page }) => {

    await page.goto(process.env.URL!);

    await pageManager.loginPage.login(
        process.env.CUSTOMER_ID!,
        process.env.PASSWORD!
    );

    console.log('Login executed using Custom Fixture');

});
