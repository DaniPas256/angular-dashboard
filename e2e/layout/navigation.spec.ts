import { test, expect } from '@playwright/test';

test('navigates to about page', async ({ page }) => {
  await page.goto('/');

  await page.click('[data-testid="users"]');
  await expect(page).toHaveURL('/users');

  await page.click('[data-testid="dashboard"]');
  await expect(page).toHaveURL('/dashboard');  

  await page.click('[data-testid="snippets"]');
  await expect(page).toHaveURL(/\/snippets(\/.*)?$/);    
});