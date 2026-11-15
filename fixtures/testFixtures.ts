import { test as base, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

type MyFixtures = {
    pageManager: PageManager;
};

export const test = base.extend<MyFixtures>({
    pageManager: async ({ page }, use) => {
        const manager = new PageManager(page);
        await use(manager);
    }
});

export { expect };