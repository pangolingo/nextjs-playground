import { expect, test as setup } from "@playwright/test";
// import 'dotenv/config';
const { TEST_USER_EMAIL, TEST_USER_PASSWORD } = process.env;

if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
  throw new Error("Could not load test user's username or password");
}

const userAuthFile = "playwright/.auth/user.json";

setup("authenticate as user", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Sign In with Auth0" }).click();
  await page.getByLabel("Email address").fill(TEST_USER_EMAIL);
  await page.getByLabel("Password").fill(TEST_USER_PASSWORD);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // await page.waitForURL('https://github.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
  await expect(page.getByText(`Logged in: ${TEST_USER_EMAIL}`)).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: userAuthFile });
});
