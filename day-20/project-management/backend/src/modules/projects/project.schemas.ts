import z from "zod";

export const porjectIdparams = z.object({
  id: z.coerce.number().int().positive(),
});

export type ProjectIdParams = z.infer<typeof porjectIdparams>;
