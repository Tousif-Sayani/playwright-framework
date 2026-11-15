import { test, expect } from '../../fixtures/testFixtures';
import { ExcelUtils } from '../../utils/ExcelUtils';

let excelData = ExcelUtils.getTestData('./test-data/UI/TestData.xlsx', 'Sheet1');

test.describe('Loan Application Test Suite', () => {

    //test.describe.configure({ mode: 'parallel' })

    test.beforeAll(async () => {
        console.log('Test Suite Started');
    });

    test.beforeEach(async ({ page }) => {
        await test.step('Step 1: Navigate to Application', async () => {
            await page.goto(process.env.URL!);
        });
    });

    test.afterEach(async ({ page }) => {
        console.log('Current Page URL:', page.url());
    });

    for (let testData of excelData) {

        test(`TC_${testData.TC_ID} - Verify Loan Application`, async ({ pageManager, page }) => {

            try {

                await test.step('Step 2: Login to APEX BANK', async () => {
                    await pageManager.loginPage.login(
                        process.env.CUSTOMER_ID!,
                        process.env.PASSWORD!
                    );
                });

                await test.step('Step 3: Navigate to Loans Center', async () => {
                    await pageManager.dashboardPage.clickLoansCenter();
                });

                await test.step('Step 4: Calculate EMI', async () => {
                    await pageManager.loansCenter.calculateEMI(
                        testData.loanType1,
                        testData.amount,
                        testData.interestRate,
                        testData.term
                    );
                });

                await test.step('Step 5: Submit Loan Application', async () => {
                    await pageManager.loansCenter.submitLoanApplication(
                        testData.fullName,
                        testData.annualIncome,
                        testData.employmentStatus,
                        testData.loanType2,
                        testData.requestAmount
                    );
                });

            } catch (error) {

                console.error(`Test Case Failed: TC_${testData.TC_ID}`);
                console.error('Error Details:', error);

                throw error;
            }

        });

        test.afterAll(async () => {
            console.log('Test Suite Completed');
        });

    }

});