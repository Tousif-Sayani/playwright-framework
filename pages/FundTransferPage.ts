import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FundTransferPage extends BasePage {

    readonly transferAmount: Locator;
    readonly executeTransfer: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.transferAmount = page.locator('#transfer-amount')
        this.executeTransfer = page.locator('#exec-transfer')
        this.successMessage = page.getByText('Transfer of $1.00 completed successfully.', { exact: true })
    }

    async executeFundTransfer(amount: string) {
        await this.fill(this.transferAmount, amount);
        await this.click(this.executeTransfer);
    }
}