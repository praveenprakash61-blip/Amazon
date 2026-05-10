import { test, expect, request } from "@playwright/test";

const loginrequest = {
  userEmail: "erds@gmail.com",
  userPassword: "Lol@pp#21",
};

let token;

test.beforeAll(async () => {
  const apicontext = await request.newContext();

  const loginresponse = await apicontext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginrequest,
    },
  );

  expect(loginresponse.ok()).toBeTruthy();

  const loginresponsejson = await loginresponse.json();
  token = loginresponsejson.token;

  console.log("Token:", token);
});

test("Verify token is generated & inserted", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // Open app
  await page.goto("https://rahulshettyacademy.com/client");

  // Validate user is logged in
  await expect(page.getByRole("button", { name: "  ORDERS" })).toBeVisible();
});
