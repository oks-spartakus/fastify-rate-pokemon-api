import { FastifyInstance } from "fastify";

import { registerUserHandler, signinHandler } from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes = async (server: FastifyInstance) => {
  server.post(
    "/signup",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: { 201: $ref("createUserResponseSchema") },
      },
    },
    registerUserHandler
  );

  server.post(
    "/signin",
    {
      schema: {
        body: $ref("signinSchema"),
        response: { 200: $ref("signinResponseSchema") },
      },
    },
    signinHandler
  );
};

export default userRoutes;
