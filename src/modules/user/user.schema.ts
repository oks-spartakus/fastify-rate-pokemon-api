import { TypeOf, z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email(),
  name: z.string(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});

const createUserResponseSchema = z.object({ id: z.number(), ...userCore });

const signinSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email(),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});

const signinResponseSchema = z.object({ accessToken: z.string() });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type SigninInput = z.infer<typeof signinSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    signinSchema,
    signinResponseSchema,
  },
  { $id: "user" }
);
