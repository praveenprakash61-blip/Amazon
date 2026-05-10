# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.js >> @API 
- Location: tests/api.spec.js:3:5

# Error details

```
Error: expect(response).toBeOK() failed


Call log:
→ GET https://reqres.in/api/users/2
  user-agent: Playwright/1.59.1 (arm64; macOS 15.7) node/24.14
  accept: */*
  accept-encoding: gzip,deflate,br
← 401 Unauthorized
  date: Sun, 10 May 2026 11:22:40 GMT
  content-type: application/json; charset=utf-8
  content-length: 843
  connection: keep-alive
  access-control-allow-origin: *
  cache-control: no-store
  cross-origin-opener-policy: same-origin
  cross-origin-resource-policy: same-origin
  etag: W/"34b-ktCrb7cpZ6PqSO/9y+g1JrA9Ml0"
  nel: {"report_to":"heroku-nel","response_headers":["Via"],"max_age":3600,"success_fraction":0.01,"failure_fraction":0.1}
  origin-agent-cluster: ?1
  referrer-policy: strict-origin-when-cross-origin
  report-to: {"group":"heroku-nel","endpoints":[{"url":"https://nel.heroku.com/reports?s=J6mW%2FWI2h3M4I3fTJvvygWPpGuE9VMaGIRvXo4cBrGk%3D\u0026sid=c4c9725f-1ab0-44d8-820f-430df2718e11\u0026ts=1778412160"}],"max_age":3600}
  reporting-endpoints: heroku-nel="https://nel.heroku.com/reports?s=J6mW%2FWI2h3M4I3fTJvvygWPpGuE9VMaGIRvXo4cBrGk%3D&sid=c4c9725f-1ab0-44d8-820f-430df2718e11&ts=1778412160"
  server: cloudflare
  strict-transport-security: max-age=31536000; includeSubDomains
  via: 1.1 heroku-router
  x-content-type-options: nosniff
  x-dns-prefetch-control: off
  x-download-options: noopen
  x-frame-options: DENY
  x-permitted-cross-domain-policies: none
  x-powered-by: ReqRes.in - Deploy backends in 30 seconds
  x-reqres-docs: https://reqres.in
  x-reqres-help: missing_api_key
  x-reqres-message: This API is powered by ReqRes. Deploy your own backend in 30 seconds!
  x-reqres-templates: https://app.reqres.in/templates
  x-reqres-tip: Generate a complete backend from a description - app.reqres.in/dashboard
  x-reqres-upgrade: https://app.reqres.in/upgrade
  x-request-id: d1d74122-5096-a584-4149-e0024841af81
  x-robots-tag: noindex, nofollow
  x-xss-protection: 0
  cf-cache-status: BYPASS
  cf-ray: 9f989140ba1448c5-LHR

Response text:
{"error":"missing_api_key","message":"The x-api-key header is required for this endpoint.","hint":"Create a free key at app.reqres.in and send it as x-api-key.","next_steps":["Go to app.reqres.in/api-keys to get your key","Add header: x-api-key: <your_key>","For app user endpoints, use Authorization: Bearer <session_token> instead"],"docs_url":"https://app.reqres.in/docs#authentication","example_curl":"curl -H \"x-api-key: YOUR_API_KEY\" https://api.reqres.in/api/collections","_meta":{"powered_by":"ReqRes","docs_url":"https://app.reqres.in/documentation","upgrade_url":"https://app.reqres.in/upgrade","example_url":"https://app.reqres.in/examples/notes-app","variant":"v1_a","message":"API key invalid or revoked. Create a new key in API Keys.","cta":{"label":"Get a key","url":"https://app.reqres.in/api-keys"},"context":"invalid_key"}}
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("@API ", async ({ request }) => {
  4  |   const response = await request.get("https://reqres.in/api/users/2");
  5  | 
  6  |   // Best practice assertion
> 7  |   await expect(response).toBeOK();
     |                          ^ Error: expect(response).toBeOK() failed
  8  | 
  9  |   const responseBody = await response.json();
  10 |   const userEmail = responseBody.data.email;
  11 | 
  12 |   console.log(`Extracted email: ${userEmail}`);
  13 | 
  14 |   // Proper assertion
  15 |   expect(userEmail).toBeDefined();
  16 | });
  17 | 
```