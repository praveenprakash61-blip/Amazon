
export async function Login(page, username, password) {

    await page.getByPlaceholder('email@example.com')
        .fill(username);

    await page.getByPlaceholder('enter your passsword')
        .fill(password);

    await page.getByRole('button', { name: 'Login' })
        .click();

}

