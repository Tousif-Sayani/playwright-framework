import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoansCenter extends BasePage {

    readonly loanTypeDropdown: Locator;
    readonly amountField: Locator;
    readonly interestRateField: Locator;
    readonly termField: Locator;
    readonly calculateEmiButton: Locator;
    readonly fullNameField: Locator;
    readonly annualIncomeField: Locator;
    readonly employeeStatusDropdown: Locator;
    readonly loanTypeDropdown2: Locator;
    readonly requestAmountField: Locator;
    readonly submitApplicationButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loanTypeDropdown = page.locator('#loan-type')
        this.amountField = page.locator('#loan-amount')
        this.interestRateField = page.locator('#loan-rate')
        this.termField = page.locator('#loan-term')
        this.calculateEmiButton = page.locator('#calc-emi-btn')
        this.fullNameField = page.locator('.terminal-input').nth(4)
        this.annualIncomeField = page.locator('#app-income')
        this.employeeStatusDropdown = page.locator('#app-employment')
        this.loanTypeDropdown2 = page.locator('.terminal-input').nth(7)
        this.requestAmountField = page.locator('.terminal-input').nth(8)
        this.submitApplicationButton = page.locator('#submit-loan-app')
    }

    async selectLoanType(locator: Locator, value: string) {
        await this.selectNativeDropdown(locator, value);
    }

    async selectEmployeeStatus(value: string) {
        await this.selectCustomDropdown(this.employeeStatusDropdown, value);
    }

    async selectApplicationLoanType(value: string) {
        await this.selectCustomDropdown(this.loanTypeDropdown2, value);
    }

    async calculateEMI(loanType: string, amount: string, interestRate: string, term: string) {
        await this.selectLoanType(this.loanTypeDropdown, loanType);
        await this.fill(this.amountField, amount);
        await this.fill(this.interestRateField, interestRate);
        await this.fill(this.termField, term);
        await this.click(this.calculateEmiButton);
    }

    async submitLoanApplication(fullName: string, annualIncome: string, employeeStatus: string, loanType: string, requestAmount: string) {
        await this.fill(this.fullNameField, fullName);
        await this.fill(this.annualIncomeField, annualIncome);
        await this.selectLoanType(this.employeeStatusDropdown, employeeStatus)
        await this.selectLoanType(this.loanTypeDropdown2, loanType)
        await this.fill(this.requestAmountField, requestAmount);
        await this.click(this.submitApplicationButton);
    }
}