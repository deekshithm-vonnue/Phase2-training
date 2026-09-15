import type { USER } from "../../generated/prisma/client";
import { ConflictError, UnauthorizedError } from "../../utils/error";
import { signToken } from "../../utils/jwt";
import { AuthRepository } from "./auth.repositry";
import type { LoginInput, RegisterInput } from "./auth.schema";
import bcrpyt from "bcrypt";
export const repository = new AuthRepository();

function safeUser(user: USER) {
  const { passwordHash, ...safeUser } = user;
  void passwordHash;
  return safeUser;
}
export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await repository.findUser(input.email);
   console.log("dfs")
    if (existingUser) {
      throw new ConflictError("EMAIL_ALREADY_EXISTS", "Email already exists");
    }
    const { password, ...registrationFields } = input;

    const passwordHash = await bcrpyt.hash(input.password, 10);

    const createData = {
      ...registrationFields,
      passwordHash,
    };
    const user = await repository.create(createData);

    return {
      user: safeUser(user),
      token: signToken({ userId: user.id }),
    };
  }

  async login(input: LoginInput) {
    const user = await repository.findUser(input.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isValid = await bcrpyt.compare(input.password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    return {
      user: safeUser(user),
      token: signToken({ userId: user.id }),
    };
  }

  async getCurrentUser(userId: string) {
    const user = await repository.findUserByID(userId);

    return safeUser(user);
  }
}
