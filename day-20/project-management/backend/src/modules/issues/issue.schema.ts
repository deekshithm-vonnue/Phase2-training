import z from "zod";

export const issueIdparams = z.object({
  id: z.string().min(1),
});

export type IssueIdparams = z.infer<typeof issueIdparams>;
