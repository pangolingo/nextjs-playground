import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/contact');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('successfully submitting the contact form', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact' }).click();

  await page.getByLabel('Name').fill('Dave');
  await page.getByLabel('Email').fill('iversondave@thoughtbot.com');
  await page.getByLabel('Charmander').check();
  await page.getByLabel('Message').fill('Hello!');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText("Thanks! We've received your message.")).toBeVisible();
});

test('filling out fields, then leaving and pressing back will keep the fields populated', async ({
  page
}) => {
  await page.goto('/contact');

  await page.getByLabel('Name').fill('Dave');
  await page.getByLabel('Email').fill('iversondave@thoughtbot.com');
  await page.getByLabel('Charmander').check();
  await page.getByLabel('Message').fill('Hello!');

  // leave
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'About Pokeland' })).toBeVisible();
  // return
  await page.goBack();

  await expect(page.getByLabel('Name')).toHaveValue('Dave');
  await expect(page.getByLabel('Email')).toHaveValue('iversondave@thoughtbot.com');
  await expect(page.getByLabel('Charmander')).toBeChecked();
  await expect(page.getByLabel('Message')).toHaveValue('Hello!');
});

test('forgetting to select a favorite starter pokemon', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByLabel('Name').fill('Dave');
  await page.getByLabel('Email').fill('daveiverson@thoughtbot.com');
  await page.getByLabel('Message').fill('Hello!');
  await page.getByRole('button', { name: 'Submit' }).click();

  // checkboxes should be invalid
  await expect(page.getByLabel('Charmander')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Squirtle')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Bulbasaur')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Pikachu')).toHaveAttribute('aria-invalid', 'true');

  await expect(page.getByText("Oops, we couldn't save the form.")).toBeVisible();
  await expect(page.getByText('"Starter Pokemon" must contain at least 1 items')).toBeVisible();
});

test('selecting too many pokemon', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByLabel('Name').fill('Dave');
  await page.getByLabel('Email').fill('daveiverson@thoughtbot.com');
  await page.getByLabel('Charmander').check();
  await page.getByLabel('Squirtle').check();
  await page.getByLabel('Bulbasaur').check();
  await page.getByLabel('Pikachu').check();
  await page.getByLabel('Message').fill('Hello!');
  await page.getByRole('button', { name: 'Submit' }).click();

  // checkboxes should be invalid
  await expect(page.getByLabel('Charmander')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Squirtle')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Bulbasaur')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Pikachu')).toHaveAttribute('aria-invalid', 'true');

  await expect(page.getByText("Oops, we couldn't save the form.")).toBeVisible();
  await expect(
    page.getByText('You can only select one starter pokemon besides Pikachu')
  ).toBeVisible();
});

test('selecting only pikachu', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByLabel('Name').fill('Dave');
  await page.getByLabel('Email').fill('daveiverson@thoughtbot.com');
  await page.getByLabel('Pikachu').check();
  await page.getByLabel('Message').fill('Hello!');
  await page.getByRole('button', { name: 'Submit' }).click();

  // checkboxes should be invalid
  await expect(page.getByLabel('Charmander')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Squirtle')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Bulbasaur')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Pikachu')).toHaveAttribute('aria-invalid', 'true');

  await expect(page.getByText("Oops, we couldn't save the form.")).toBeVisible();
  await expect(page.getByText('If you select Pikachu you must pick another one too')).toBeVisible();
});

test('entering a message that is too long', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByLabel('Name').fill('Dave');
  await page.getByLabel('Email').fill('daveiverson@thoughtbot.com');
  await page.getByLabel('Charmander').check();

  await page
    .getByLabel('Message')
    .fill('This is a really long message that will be considered invalid.');
  await page.getByLabel('Charmander').check();
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByLabel('Message')).toHaveAttribute('aria-invalid', 'true');
  await expect(
    page.getByText('"Message" length must be less than or equal to 30 characters long')
  ).toBeVisible();
  await expect(page.getByText("Oops, we couldn't save the form.")).toBeVisible();
});
