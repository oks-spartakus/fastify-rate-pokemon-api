import { z } from "zod";

const createUserSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email(),
  name: z.string(),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
