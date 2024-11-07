import { test, expect } from '@playwright/test';

test.describe('Testes E2E no site The Internet', () => {

  test('Testar a Adição e remoção de elementos', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.click('button[onclick="addElement()"]');
    const elements = page.locator('.added-manually');
    await expect(elements).toHaveCount(1);
    await elements.first().click();
    await expect(elements).toHaveCount(0);
  });

  test('Testar função de arrastar e soltar', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const boxA = page.locator('#column-a');
    const boxB = page.locator('#column-b');
    await boxA.dragTo(boxB);
    await expect(boxA).toContainText('B');
    await expect(boxB).toContainText('A');
  });

  test('Testar funcionamento de alertas', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', dialog => dialog.accept());
    await page.click('button[onclick="jsAlert()"]');
    await expect(page.locator('#result')).toHaveText(
      'You successfully clicked an alert'
    );
  });

  test('Testar a responsividade do site', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('h2')).toBeVisible();
  });

  test('Testar a autenticação basica', async ({ page }) => {
    await page.goto(
      'https://admin:admin@the-internet.herokuapp.com/basic_auth'
    );
    await expect(page.locator('h3')).toHaveText('Basic Auth');
  });

  test('Testar os formulários de dropdown', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('#dropdown', '1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
  });

  test('Testar a exibição de mensagens temporárias', async ({ page }) => {
    await page.goto(
      'https://the-internet.herokuapp.com/notification_message_rendered'
    );
    await page.click('a[href="/notification_message"]');
    await expect(page.locator('.flash')).toBeVisible();
  });

  test('Testar o redirecionamento de URL', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/redirector');
    await page.click('a[id="redirect"]');
    await expect(page).toHaveURL(
      'https://the-internet.herokuapp.com/status_codes'
    );
  });
});
