import { test, expect, request } from "@playwright/test";

const payload = {
  userid: 1,
  title: "prakashAPI",
  body: "kya hai",
};

//GetExample

test("Api testing with post", async ({ request }) => {
  // const response = await request.get("https://jsonplaceholder.typicode.com");

  //   expect(response.status()).toBe(200);
  //   const body = response.json;
  //   console.log(body);

  //PostExmaple
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    { data: payload },
  );

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.title).toBe(payload.title);
  expect(body.body).toBe(payload.body);
  expect(body).toHaveProperty("id");

  expect(response.headers()["content-type"]).toContain("application/json");
});
