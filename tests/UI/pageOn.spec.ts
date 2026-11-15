import { test } from '@playwright/test';

test('Monitor Browser Console', async ({ page }) => {

    console.log('TEST STARTED');

    page.on('console', message => {
        console.log('BROWSER EVENT:', message.type(), message.text());
    });

    await page.goto('https://www.saucedemo.com/');

    console.log('PAGE LOADED');

    await page.evaluate(() => {
        console.log('Hello from browser');
        console.error('This is a test error');
    });

    console.log('TEST COMPLETED');
});