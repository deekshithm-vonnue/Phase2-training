import z from "zod";

export const porjectIdparams = z.object({
  id: z.string().min(1),
});

export type ProjectIdParams = z.infer<typeof porjectIdparams>;
