import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";

import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    auth: any;
  }
}

server.register(fjwt, { secret: "873927493ufkasjdfiskhd098320850-fjsdkn" });

server.decorate(
  "auth",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

server.get("/health", async () => {
  return { status: "OK" };
});

const main = async () => {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });

  try {
    await server.listen({ port: 3000 });

    console.log("server ready at port 3000");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
