import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    readonly custId: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);

        this.custId = page.getByRole('textbox', { name: 'Enter Username' })
        this.password = page.getByPlaceholder('Enter password')
        this.loginButton = page.locator('#login-btn');
    }


    async login(custId: string, password: string) {
        await this.fill(this.custId, custId)
        await this.fill(this.password, password)
        await this.click(this.loginButton)
    }
}