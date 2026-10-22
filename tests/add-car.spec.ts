import { test, expect } from '@playwright/test';

// spec: specs/add-car.md

test.describe('Guest adds a car to Garage', () => {
  test('Guest adds a car to Garage', async ({ page }) => {
    await page.goto('/');

    // Log in as a guest.
    await page.getByRole('button', { name: 'Guest log in' }).click();

    // Open the Add car form.
    await page.getByRole('button', { name: 'Add car' }).click();

    // Select Audi as the brand and TT as the model.
    await page.getByLabel('Brand').selectOption({ label: 'Audi' });
    await page.getByLabel('Model').selectOption({ label: 'TT' });

    // Enter the mileage.
    await page.getByRole('spinbutton', { name: 'Mileage' }).fill('12000');

    // Save the car.
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify the Garage URL and the visible Audi TT entry.
    await expect(page).toHaveURL(/panel\/garage/);
    await expect(page.getByText('Audi TT', { exact: true })).toBeVisible();
  });
});
