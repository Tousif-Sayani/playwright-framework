import { test, expect } from '@playwright/test';


//route.continue
test('Verify Fruits API response status', async ({ page }) => {

    await page.route('**/api/v1/fruits', async (route) => {

        console.log('Fruit API intercepted!');

        await route.continue();

    });

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/api/v1/fruits')
    );

    await page.goto('https://demo.playwright.dev/api-mocking');

    const response = await responsePromise;

    expect(response.status()).toBe(200);

});

//route.fulfill positive
test('Mock Fruits API', async ({ page }) => {

    await page.route('**/api/v1/fruits', async (route) => {

        console.log('Fruit API intercepted!');

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                { id: 101, name: 'Mango', price: 50 },
                { id: 102, name: 'Apple', price: 100 }
            ])
        });

    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    await page.waitForTimeout(3000)

});

//route.fulfill negative 500 Internal Server Error
test('Verify Fruits API - 500 error', async ({ page }) => {

    await page.route('**/api/v1/fruits', async (route) => {

        console.log('Fruit API intercepted!');

        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: 'Something went wrong'
            })
        });

    });

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/api/v1/fruits')
    );

    await page.goto('https://demo.playwright.dev/api-mocking');

    await page.waitForTimeout(3000)

    const response = await responsePromise;

    expect(response.status()).toBe(500);

    await page.waitForTimeout(3000)

});

//route.fulfill negative 404 Internal Server Error
test('Verify Fruits API - 404 error', async ({ page }) => {

    await page.route('**/api/v1/fruits', async (route) => {

        console.log('Fruit API intercepted!');

        await route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({
                error: 'Not Found',
                message: 'Fruits data not found'
            })
        });

    });

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/api/v1/fruits')
    );

    await page.goto('https://demo.playwright.dev/api-mocking');

    const response = await responsePromise;

    expect(response.status()).toBe(404);

    await page.waitForTimeout(3000)
});

//route.abort
test('Verify Fruits API - Network failure', async ({ page }) => {

    page.on('requestfailed', request => {
        console.log('Request Failed:', request.url());
        console.log('Failure:', request.failure()?.errorText);
    });

    await page.route('**/api/v1/fruits', async (route) => {

        console.log('Fruit API intercepted!');

        await route.abort('internetdisconnected');

    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    await page.waitForTimeout(3000)

});
