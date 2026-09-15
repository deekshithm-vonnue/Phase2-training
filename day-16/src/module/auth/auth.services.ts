import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { LoginInput, RegisterInput } from "./auth.schemas";
import { AuthRepository } from "./auth.repository";
import { ConflictError, UnauthorizedError } from "../../utils/error";
import { token } from "morgan";
import { signToken } from "../../utils/jwt";

const repository = new AuthRepository();

function toSafeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  void passwordHash;
  return safeUser;
}

export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await repository.findExist(input);

    if (existingUser) {
      throw new ConflictError("EMAIL_ALREADY_EXISTS", "Email already exists");
    }
    const { password, ...registrationFields } = input;

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await repository.create({
      ...registrationFields,
      passwordHash,
    });
    return {
      user: toSafeUser(user),
      token: signToken({ userId: user.id, role: user.role }),
    };
  }

  async login(input: LoginInput) {
    const user = await repository.findExist(input);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    return {
      user: toSafeUser(user),
      token: signToken({ userId: user.id, role: user.role }),
    };
  }

  async getCurrentUser(userId: number) {
    const user = await repository.findUser(userId);

    return toSafeUser(user);
  }
}
