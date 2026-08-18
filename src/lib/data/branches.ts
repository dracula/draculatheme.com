import { redis } from "@/lib/redis";

export const getBranch = async (repository: string): Promise<string> => {
  const storedValue = await redis.hget("branches", repository);
  const branchName = storedValue?.trim();

  return branchName && branchName.length > 0 ? branchName : "main";
};
