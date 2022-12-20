import { FastifyInstance } from "fastify";
import { register } from "fastify-zod";
import {
  getUsersHandler,
  registerUserHandler,
  signinHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes = async (server: FastifyInstance) => {
  server.post(
    "/",
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

  server.get("/", { preHandler: [server.auth] }, getUsersHandler);
};

export default userRoutes;
