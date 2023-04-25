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


//Navigate to settings and edit the bio and name and submit for update
    //Click on settings on the sidebar
    await page.locator('a').filter({ hasText: 'Settings' }).click();

    //Click on profile
    await page.getByRole('link', { name: 'Profile', exact: true }).click();
    await page.getByPlaceholder('Enter institution description').click();
    //Select all the text displayed in the textbox
    await page.getByPlaceholder('Enter institution description').press('Meta+a');
    //Set text for the  bio to be /Testing the bio change/
    await page.getByPlaceholder('Enter institution description').fill('Testing the bio change');

    //Click on the name textbox
    await page.getByPlaceholder('Enter name').click();
    //Select all the text displayed in the box
    await page.getByPlaceholder('Enter name').press('Meta+a');

    //Set text for the  name to be /Testing the bio change/    
    await page.getByPlaceholder('Enter name').fill('Helium Preprod Environment');
    //Click on submit
    await page.getByRole('button', { name: 'Submit' }).click();

//Click out of the profile and click back into the profile to confirm that the details are saved
    //Click on staff
    await page.getByRole('link', { name: 'Staff' }).click();
    //Click back into profile again
    await page.getByRole('link', { name: 'Profile', exact: true }).click();
    //Confirm that the bio and name was updated
    await page.getByPlaceholder('Enter name').click();
    await expect(page.getByPlaceholder('Enter name')).toHaveText("");
    await page.getByPlaceholder('Enter institution description').click();
    await expect(page.getByPlaceholder('Enter institution description')).toHaveText("");




})