// add the test and expect modules as well as the playwright modules
const { test, expect } = require('@playwright/test');

test('Test login with valid correct details', async ({ page }) => {
    await page.goto('https://preprod.onemedtest.com/login');

//Login with valid details and confirm that the user is displayed with landing patient list page
    //Enter valid email
    await page.getByPlaceholder('Your Phone Number or Email').click();
    await page.getByPlaceholder('Your Phone Number or Email').fill('peterabah@heliumhealth.com');

    //Enter valid password
    await page.getByPlaceholder('Your Password').click();
    await page.getByPlaceholder('Your Password').fill('password');
    
    //Click on sign in
    await page.getByRole('button', { name: 'Sign in' }).click();


    // //Click on the location to sign into (first one)
    // await page.getByText('Hope Hospital, Al Daayen').click();

    //Confirm the user sees patient list landing page
    await expect(page.getByRole('heading', { name: 'Patients' })).toHaveText(/Patients/);
    await expect(page.getByRole('link', { name: 'Recently seen' })).toHaveText(/Recently seen/);

})

test('Test login with invalid incorrect details', async ({ page }) => {
    await page.goto('https://preprod.onemedtest.com/login');
  
//Login with invalid details (Invalid emails and password) and confirm error message


    //Enter invalid email
    await page.getByPlaceholder('Your Phone Number or Email').click();
    await page.getByPlaceholder('Your Phone Number or Email').fill('adminadd@example.com');

    //Enter valid password
    await page.getByPlaceholder('Your Password').click();
    await page.getByPlaceholder('Your Password').fill('passworded');


    //Click on sign in
    await page.getByRole('button', { name: 'Sign in' }).click();

    //Confirm the error message is displayed
    await expect(page.getByText('Invalid email/phone no or password.')).toHaveText("Invalid email/phone no or password.");


})