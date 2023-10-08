import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/pokemon');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('the pokemon page lists pokemon', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();

  const pokemonList = page.getByRole('list');
  const pokemonListItems = pokemonList.getByRole('link');
  await expect(pokemonListItems).toHaveCount(20);
  await expect(pokemonListItems.nth(0)).toContainText('#1 BULBASAUR', { ignoreCase: true });
  await expect(pokemonListItems.nth(19)).toContainText('#20 RATICATE', { ignoreCase: true });
});

test('the pokemon list is paginated', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
  await expect(page.getByRole('heading', { name: '1292 pokemon (page 1)' })).toBeVisible();
  await expect(page.getByRole('link', { name: '#1 bulbasaur' })).toBeVisible();

  await page.getByRole('link', { name: 'Next page' }).click();
  await expect(page.getByRole('heading', { name: '1292 pokemon (page 2)' })).toBeVisible();
  await expect(page.getByRole('link', { name: '#21 spearow' })).toBeVisible();
  await expect(page.getByRole('link', { name: '#1 bulbasaur' })).not.toBeVisible();

  await page.getByRole('link', { name: 'Previous page' }).click();
  await expect(page.getByRole('heading', { name: '1292 pokemon (page 1)' })).toBeVisible();
  await expect(page.getByRole('link', { name: '#1 bulbasaur' })).toBeVisible();
  await expect(page.getByRole('link', { name: '#21 spearow' })).not.toBeVisible();
});
