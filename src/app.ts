import cors from "@fastify/cors";
import fastify, { type FastifyRequest } from "fastify";
import mockAuth from "./mocks/auth.json";
import mockMenu from "./mocks/menus.json";
import mockReceipt from "./mocks/receipt.json";
const app = fastify();
app.register(cors, {
  // put your options here
});

app.post(
  "/qarshicafe/hs/mzakaz/auth",
  (
    req: FastifyRequest<{
      Body: {
        login: string;
        pwd: string;
      };
    }>,
    res
  ) => {
    if (req.body.login !== "admin" || req.body.pwd !== "pass") {
      return new Error("Unauthorized");
    }

    return mockAuth;
  }
);

app.get("/qarshicafe/hs/mzakaz/menu", (req, res) => {
  return mockMenu;
});

app.get("/qarshicafe/hs/mzakaz/:id", (req, res) => {
  return mockReceipt;
});

export default app;
