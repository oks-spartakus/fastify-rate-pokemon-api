import prisma from "../../utils/prisma";
import { CreatePokemonInput } from "./pokemon.schema";

export const createPokemon = (data: CreatePokemonInput) =>
  prisma.pokemon.create({ data: { ...data, points: 0 } });

export const voteForPokemon = async (id: number) =>
  prisma.pokemon.update({
    where: { id },
    data: { points: { increment: 1 } },
  });

export const findPokemon = (id: number) =>
  prisma.pokemon.findUnique({ where: { id } });

export const getTop = () =>
  prisma.pokemon.findMany({
    take: 10,
    select: { id: true, name: true, points: true },
    orderBy: { points: "desc" },
  });
