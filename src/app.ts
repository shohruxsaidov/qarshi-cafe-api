import cors from "@fastify/cors";
import fastify from "fastify";
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

app.post("/qarshicafe/hs/mzakaz/:id", (req, res) => {
  const data = JSON.parse(req.body as string) as { id: string };
  if (data.id) {
    return mockOneReceipt;
  }

  return mockReceipt;
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
