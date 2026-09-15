import { Prisma, User } from "@prisma/client";
import { prisma } from "../../db/prisma";
import { LoginInput, RegisterInput } from "./auth.schemas";

export class AuthRepository {
  async findExist(data: RegisterInput | LoginInput) {
    return await prisma.user.findUnique({
      where: { email: data.email },
    });
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    return prisma.user.create({
      data,
    });
  }
  async findUser(userId: number) {
    return await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
