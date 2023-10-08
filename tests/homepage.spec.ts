import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('index page has a headline', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to Pokeland' })).toBeVisible();
});

test('the homepage links to the pokemon list', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
  await expect(page.getByRole('heading', { name: '1292 pokemon (page 1)' })).toBeVisible();
});
