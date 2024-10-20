import { IUser } from "../interfaces";
import * as fs from "node:fs/promises";
import * as path from "path";

export const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const checkRequiredUserKeys = (user: IUser) => {
  let isAllKeys = true;
  const keys = [
    { type: "string", value: "name" },
    { type: "number", value: "age" },
    { type: "string[]", value: "hobbies" },
  ];

  if (user?.id && !user?.id?.match(uuidRegex)) {
    return false;
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key.type === "string[]") {
      const value = user[key.value as keyof IUser];
      if (
        !value ||
        !Array.isArray(value) ||
        value.find((item) => typeof item !== "string")
      ) {
        isAllKeys = false;
        break;
      }
      continue;
    }
    if (typeof user[key.value as keyof IUser] !== key.type) {
      isAllKeys = false;
      break;
    }
  }
  return isAllKeys;
};

export const isUserKeysValid = (user: IUser) => {
  let isAllKeys = true;
  const keys = [
    { type: "string", value: "name" },
    { type: "number", value: "age" },
    { type: "string[]", value: "hobbies" },
  ];
  const userKeys = Object.keys(user);

  if (user?.id && !user?.id?.match(uuidRegex)) {
    return false;
  }

  for (let i = 0; i < userKeys.length; i++) {
    const userKey = userKeys[i];
    const key = keys.find((key) => key.value === userKeys[i]);
    if (!key) return false;
    if (userKey === "hobbies") {
      const value = user[userKey];
      if (
        !value ||
        !Array.isArray(value) ||
        value.find((item) => typeof item !== "string")
      ) {
        isAllKeys = false;
        break;
      }
      continue;
    }
    if (typeof user[userKey as keyof IUser] !== key.type) {
      isAllKeys = false;
      break;
    }
  }
  return isAllKeys;
};

export const getEnvVariable = async (name: string) => {
  const env = await fs.readFile(path.resolve(process.cwd(), ".env"));
  const envContent = env.toString();
  const target = envContent.split(" ").find((chunk) => chunk.includes(name));
  return target?.slice(target?.indexOf("=") + 1);
};
