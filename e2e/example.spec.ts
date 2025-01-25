const { test, expect } = require('@playwright/test');

test('Click on Sign In link', async ({ page }) => {
  // Przejdź do strony głównej
  await page.goto('http://localhost:3000/');

  // Zlokalizuj link po tekście i kliknij
  await page.click('text=Sign In');

  // Sprawdź, czy URL zmienił się na "/user/signin"
  await expect(page).toHaveURL('http://localhost:3000/user/signin');


   // Wypełnij pole e-mail
   await page.fill('input#email', 'piotrpobozniak91@gmail.com');

   // Opcjonalnie: Wypełnij hasło, jeśli jest wymagane
   await page.fill('input[type="password"]', 'qwerty12');
 
   // Kliknij przycisk "Zaloguj się"
   await page.click('button:has-text("Zaloguj się")');
 

});



