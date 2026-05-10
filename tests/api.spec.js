import { test, expect } from "@playwright/test";

test("@API ", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");

  // Best practice assertion
  // await expect(response).toBeOK();
  await expect(response.status()).toBe(401);

  const responseBody = await response.json();
  const userEmail = responseBody.data.email;

  console.log(`Extracted email: ${userEmail}`);

  // Proper assertion
  expect(userEmail).toBeDefined();
});
