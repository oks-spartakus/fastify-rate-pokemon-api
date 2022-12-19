import { FastifyInstance } from "fastify";
import { register } from "fastify-zod";
import { registerUserHandler } from "./user.controller";

const userRoutes = async (server: FastifyInstance) => {
  server.post("/", registerUserHandler);
};

export default userRoutes;
