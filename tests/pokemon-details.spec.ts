import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/pokemon');
  await page.getByRole('link', { name: '#1 BULBASAUR' }).click();
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('pokemon details page shows details', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
  await page.getByRole('link', { name: '#1 BULBASAUR' }).click();

  await expect(page.getByRole('heading', { name: 'BULBASAUR' })).toBeVisible();

  const pokemonList = page.getByRole('list').filter({ has: page.getByText('overgrow') });
  const pokemonListItems = pokemonList.getByRole('listitem');

  await expect(page.getByRole('heading', { name: 'Abilities' })).toBeVisible();
  await expect(pokemonListItems).toHaveText(['overgrow', 'chlorophyll']);
});
