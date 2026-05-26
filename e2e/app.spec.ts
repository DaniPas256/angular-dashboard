import { test, expect } from '@playwright/test';

test('Angular app loads', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.locator('app-root')).toBeVisible();
});