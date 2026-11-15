import { test } from '@playwright/test';

test('Monitor Page Events', async ({ page }) => {

    // Network requests
    page.on('request', request => {
        console.log('REQUEST:', request.url());
    });

    // Network responses
    page.on('response', response => {
        console.log('RESPONSE:', response.url(), response.status());
    });

    // Browser console
    page.on('console', message => {
        console.log('CONSOLE:', message.type(), message.text());
    });

    // JavaScript errors
    page.on('pageerror', error => {
        console.log('PAGE ERROR:', error.message);
    });

    await page.goto('https://reqres.in/');

    console.log('PAGE LOADED')
});