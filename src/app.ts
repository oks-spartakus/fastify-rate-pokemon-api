import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { withRefResolver } from "fastify-zod";
import fjwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { pokemonSchemas } from "./modules/pokemon/pokemon.schema";
import pokemonRoutes from "./modules/pokemon/pokemon.route";
import { version } from "../package.json";

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
  for (const schema of [...userSchemas, ...pokemonSchemas]) {
    server.addSchema(schema);
  }

  server.register(swagger, {});
  server.register(
    swaggerUi,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Rate Pokemon API",
          description: "API for voting for best Pokemon",
          version,
        },
      },
    })
  );
  server.register(userRoutes, { prefix: "users" });
  server.register(pokemonRoutes, { prefix: "pokemons" });

  try {
    await server.listen({ port: 3000 });
    server.swagger();

    console.log("server ready at port 3000");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
