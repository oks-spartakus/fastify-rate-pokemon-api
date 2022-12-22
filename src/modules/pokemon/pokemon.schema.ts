import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const pokemonInput = {
  name: z.string(),
  img: z.string(),
};

const pokemonGenerated = {
  id: z.number(),
  points: z.number(),
};

const createPokemonSchema = z.object({ ...pokemonInput });
const pokemonResponseSchema = z.object({
  ...pokemonInput,
  ...pokemonGenerated,
});

const pokemonRankingResponseSchema = z.array(pokemonResponseSchema);

const pokemonIdSchema = z.object({ id: z.number() });

export type CreatePokemonInput = z.infer<typeof createPokemonSchema>;
export type PokemonIdParam = z.infer<typeof pokemonIdSchema>;

export const { schemas: pokemonSchemas, $ref } = buildJsonSchemas(
  {
    createPokemonSchema,
    pokemonResponseSchema,
    pokemonRankingResponseSchema,
    pokemonIdSchema,
  },
  { $id: "pokemon" }
);
