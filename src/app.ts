import cors from "@fastify/cors";
import fastify from "fastify";
import fs from "node:fs";
import path from "node:path";
import mockAuth from "./mocks/auth.json";
import mockMenu from "./mocks/menus.json";
import mockOneReceipt from "./mocks/one-receipt.json";
import mockReceipt from "./mocks/receipt.json";

const app = fastify();
app.register(cors, {
  // put your options here
});

app.post("/qarshicafe/hs/mzakaz/auth", (req, res) => {
  const { login, pwd } = JSON.parse(req.body as string) as {
    login: string;
    pwd: string;
  };
  if (login !== "admin" || pwd !== "pass") {
    return new Error("Unauthorized");
  }

  return mockAuth;
});

app.post("/qarshicafe/hs/mzakaz/menu", (req, res) => {
  return mockMenu;
});

app.post("/qarshicafe/hs/mzakaz/receipt", (req, res) => {
  const data = JSON.parse(req.body as string) as { id: string };
  if (data.id) {
    return mockOneReceipt;
  }

  return mockReceipt;
});

app.post("/qarshicafe/hs/mzakaz/sale", (req, res) => {
  const data = JSON.parse(req.body as string) as { id: string; data?: any };
  if (data.data) {
    return { ok: true, result: true };
  }
  if (data.id) {
    return mockOneReceipt;
  }

  return mockReceipt;
});

app.post("/qarshicafe/hs/mzakaz/preschet", (req, res) => {
  const src = import.meta.dirname;
  const pdfPath = path.join(process.cwd(), "src/mocks/receipt.pdf");
  if (!fs.existsSync(pdfPath)) {
    fs.writeFileSync(pdfPath, "%PDF-1.4\n%Mock PDF content\n%%EOF");
  }
  const file = fs.readFileSync(pdfPath);
  res.header("filename", "receipt.pdf");
  res.header("Content-Type", "application/json");
  res.header("ok", "1");

  return file;
});

app.setNotFoundHandler((request, reply) => {
  console.log({
    method: request.method,
    url: request.url,
    body: request.body,
  });
  reply.code(404).send({
    error: "Not Found",
    message: `The route ${request.method} ${request.url} does not exist`,
  });
});

export default app;
