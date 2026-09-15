import { prisma } from "../../db/primsa";
import type { USERUncheckedCreateInput } from "../../generated/prisma/models";
import type { RegisterInput } from "./auth.schema";

export class AuthRepository {
  async findUser(email: string) {
    return await prisma.uSER.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findUserByID(id: string) {
    return await prisma.uSER.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async create(input: USERUncheckedCreateInput) {
    return await prisma.uSER.create({
      data: input,
    });
  }
}
