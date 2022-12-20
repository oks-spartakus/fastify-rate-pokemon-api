import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
};

export const findUserByEmail = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const findUsers = async () =>
  prisma.user.findMany({ select: { email: true, name: true, id: true } });
