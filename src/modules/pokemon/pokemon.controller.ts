import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePokemonInput } from "./pokemon.schema";
import {
  createPokemon,
  findPokemon,
  getTop,
  voteForPokemon,
} from "./pokemon.service";

export const createPokemonHandler = async (
  request: FastifyRequest<{ Body: CreatePokemonInput }>,
  reply: FastifyReply
) => {
  try {
    const pokemon = await createPokemon({ ...request.body });

    return reply.code(201).send(pokemon);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return reply.code(409).send("There is already pokemon with this name.");
    }
    return reply.code(500).send(error);
  }
};

export const voteForPokemonHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  try {
    const pokemon = await voteForPokemon(id);

    return reply.code(200).send(pokemon);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return reply.code(404).send("There is no such Pokemon.");
    }
    return reply.code(500).send(error);
  }
};

export const getPokemonHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  try {
    const pokemon = await findPokemon(id);

    if (!pokemon) {
      return reply.code(404).send("There is no such Pokemon.");
    }
    return reply.code(200).send(pokemon);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const getTopHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const list = await getTop();
    return reply.code(200).send(list);
  } catch (error) {
    return reply.code(500).send(error);
  }
};
