
import { hash, verify, type Options } from "@node-rs/argon2";

const argon2Options: Options = {
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
  outputLen: 32,
  algorithm: 2,
};

// Hash password
export async function hashPassword(
  password: string
): Promise<string> {
  return await hash(password, argon2Options);
}

// Verify password
export async function verifyPassword(data: {
  hash: string;
  password: string;
}): Promise<boolean> {
  return await verify(
    data.hash,
    data.password,
    argon2Options
  );
}
