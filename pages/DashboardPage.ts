import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {

    readonly accountsSummary: Locator;
    readonly fundsTransfer: Locator;
    readonly cardsControls: Locator;
    readonly loansCenter: Locator;
    readonly customerSupport: Locator;
    readonly preferences: Locator;
    readonly signOutButton: Locator;
    readonly resetDatabaseButton: Locator;


    constructor(page: Page) {
        super(page);

        this.accountsSummary = page.locator('#tab-dashboard')
        this.fundsTransfer = page.locator('#tab-transfers')
        this.cardsControls = page.locator('#tab-cards')
        this.loansCenter = page.locator('#tab-loans')
        this.customerSupport = page.locator('#tab-support')
        this.preferences = page.locator('#tab-settings')
        this.resetDatabaseButton = page.getByRole('button', { name: 'Reset Database' })
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' })

    }


    async clickAccountsSummary() {
        await this.click(this.accountsSummary);
    }

    async clickFundsTransfer() {
        await this.click(this.fundsTransfer);
    }

    async clickCardsControls() {
        await this.click(this.cardsControls);
    }

    async clickLoansCenter() {
        await this.click(this.loansCenter);
    }

    async clickCustomerSupport() {
        await this.click(this.customerSupport);
    }

    async clickPreferences() {
        await this.click(this.preferences);
    }

    async clickResetDatabase() {
        await this.click(this.resetDatabaseButton);
    }

    async clickSignOut() {
        await this.click(this.signOutButton);
    }

}