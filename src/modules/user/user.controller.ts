import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../app";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, SigninInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service";

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  const { body } = request;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
};

export const signinHandler = async (
  request: FastifyRequest<{ Body: SigninInput }>,
  reply: FastifyReply
) => {
  const { body } = request;

  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({ message: "Invalid email or password" });
  }

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;

    return { accessToken: server.jwt.sign(rest) };
  }

  return reply.code(401).send({ message: "Invalid email or password" });
};

export const getUsersHandler = async () => {
  const users = await findUsers();

  return users;
};
