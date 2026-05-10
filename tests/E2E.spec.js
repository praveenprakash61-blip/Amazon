import { test, expect, request } from "@playwright/test";

const payload = { userEmail: "erds@gmail.com", userPassword: "Lol@pp#21" };
const payloaddata = {
  country: "India",
  productOrderedId: "6581ca979fd99c85e8ee7faf",
};
let token;
let orderId;

test("E2E flow test", async ({ page, request }) => {
  const response = await request.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: payload,
    },
  );
  expect(response.status()).toBe(200);

  const loginjson = await response.json();

  token = loginjson.token;

  // Step 2: Create Order
  const orderResponse = await request.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: { payloaddata },
    },
  );

  const orderJson = await orderResponse.json();
  const orderId = orderJson.orders[0];

  //Inject token to UI

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");
});
