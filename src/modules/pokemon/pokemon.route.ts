import { FastifyInstance } from "fastify";
import {
  createPokemonHandler,
  getPokemonHandler,
  getTopHandler,
  voteForPokemonHandler,
} from "./pokemon.controller";
import { $ref } from "./pokemon.schema";

const pokemonRoutes = async (server: FastifyInstance) => {
  server.post(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("createPokemonSchema"),
        response: { 201: $ref("pokemonResponseSchema") },
      },
    },
    createPokemonHandler
  );

  server.post(
    "/vote/:id",
    {
      preHandler: [server.auth],
      schema: {
        params: $ref("pokemonIdSchema"),
        response: { 200: $ref("pokemonResponseSchema") },
      },
    },
    voteForPokemonHandler
  );

  server.get("/", getTopHandler);

  server.get(
    "/:id",
    {
      schema: {
        params: $ref("pokemonIdSchema"),
        response: { 200: $ref("pokemonResponseSchema") },
      },
    },
    getPokemonHandler
  );
};

export default pokemonRoutes;
