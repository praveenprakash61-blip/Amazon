# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.js >> @API 
- Location: tests/api.spec.js:3:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'email')
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("@API ", async ({ request }) => {
  4  |   const response = await request.get("https://reqres.in/api/users/2");
  5  | 
  6  |   // Best practice assertion
  7  |   // await expect(response).toBeOK();
  8  |   await expect(response.status()).toBe(401);
  9  | 
  10 |   const responseBody = await response.json();
> 11 |   const userEmail = responseBody.data.email;
     |                                       ^ TypeError: Cannot read properties of undefined (reading 'email')
  12 | 
  13 |   console.log(`Extracted email: ${userEmail}`);
  14 | 
  15 |   // Proper assertion
  16 |   expect(userEmail).toBeDefined();
  17 | });
  18 | 
```