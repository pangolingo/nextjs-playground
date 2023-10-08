import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/about');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});

test('contains some content and a dialog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'About' }).click();

  await expect(page.getByRole('heading', { name: 'About Pokeland' })).toBeVisible();

  page.once('dialog', (dialog) => {
    expect(dialog.message()).toEqual('PIKA PIKA!');
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'PIKA!' }).click();

  await page.getByRole('link', { name: 'Tell me you like this site' }).click();
  await expect(page.getByRole('heading', { name: 'Contact me' })).toBeVisible();
});
