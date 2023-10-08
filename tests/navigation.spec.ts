import { test, expect } from '@playwright/test';

test('using header navigation', async ({ page }) => {
  await page.goto('/');
  await expect(await page.title()).toEqual('Pokeland');
  await expect(page.getByRole('link', { name: 'Pokeland' })).toBeVisible();

  await page.getByRole('link', { name: 'Pokemon', exact: true }).click();
  await expect(page.getByRole('heading', { name: '1292 pokemon (page 1)' })).toBeVisible();
  await expect(await page.title()).toEqual('All Pokemon - Pokeland');

  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'About Pokeland' })).toBeVisible();
  await expect(await page.title()).toEqual('About - Pokeland');

  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('heading', { name: 'Contact me' })).toBeVisible();
  await expect(await page.title()).toEqual('Contact - Pokeland');

  await page.getByRole('link', { name: 'Pokeland' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Pokeland' })).toBeVisible();
});
