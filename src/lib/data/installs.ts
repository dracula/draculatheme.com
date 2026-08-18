import { redis } from "@/lib/redis";

export const getInstall = async (repository: string): Promise<string> => {
  const storedValue = await redis.hget("installs", repository);

  if (!storedValue) {
    return "";
  }

  return Buffer.from(storedValue, "base64").toString("utf8");
};
