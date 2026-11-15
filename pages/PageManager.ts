import { Page } from '@playwright/test';

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { FundTransferPage } from './FundTransferPage';
import { LoansCenter } from './LoansCenter';

export class PageManager {

    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    readonly fundTransferPage: FundTransferPage;
    readonly loansCenter: LoansCenter;

    constructor(page: Page) {

        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.fundTransferPage = new FundTransferPage(page);
        this.loansCenter = new LoansCenter(page);

    }
}