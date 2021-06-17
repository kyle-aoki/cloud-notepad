import fetch from "node-fetch";

const userServiceHost = "http://localhost:4000";

async function fetchJson(url: string, options?: any) {
  const response = await fetch(url, options || {});
  const responseJson = await response.json();
  return responseJson;
}

test("Ping user-svc", async () => {
  const res = await fetchJson(userServiceHost);
  expect(res.ok).toBe(true);
});

test("Test full suite of requests", async () => {
  let res = await fetchJson(userServiceHost + "/v1/create-user", {
    method: "POST",
    body: JSON.stringify({ username: "testuser", password: "testpass" }),
    headers: {
      api_key: "123",
      "Content-Type": "application/json",
    },
  });
  expect(res.ok).toBe(true);

  res = await fetchJson(userServiceHost + "/v1/log-in", {
    method: "POST",
    body: JSON.stringify({ username: "testuser", password: "testpass" }),
    headers: {
      api_key: "123",
      "Content-Type": "application/json",
    },
  });
  expect(res.ok).toBe(true);

  const username = res.data.username;
  const session_token = res.data.session_token;

  res = await fetchJson(userServiceHost + "/v1/user/authenticate", {
    method: "POST",
    headers: {
      api_key: "123",
      username: username,
      session_token: session_token,
      "Content-Type": "application/json",
    },
  });
  expect(res.ok).toBe(true);

  res = await fetchJson(userServiceHost + "/v1/user/delete-user", {
    method: "DELETE",
    body: JSON.stringify({ password: "testpass" }),
    headers: {
      api_key: "123",
      username: username,
      session_token: session_token,
      "Content-Type": "application/json",
    },
  });
  expect(res.ok).toBe(true);
});
