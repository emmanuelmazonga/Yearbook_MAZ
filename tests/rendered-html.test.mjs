import assert from "node:assert/strict";
import test from "node:test";

test("renders production sharing metadata and security headers", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');
  assert.match(response.headers.get('content-security-policy') ?? '',/frame-ancestors 'none'/);
  const html=await response.text();
  assert.match(html,/<meta property="og:image" content="https:\/\/copperview-yearbook\.emmanuelmazonga\.chatgpt\.site\/og\.png"/);
  assert.match(html,/<link rel="canonical" href="https:\/\/copperview-yearbook\.emmanuelmazonga\.chatgpt\.site\/"/);
  assert.match(html,/<link rel="manifest"/);
});
