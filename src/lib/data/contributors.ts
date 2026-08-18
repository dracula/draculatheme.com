import { redis } from "@/lib/redis";

export type Contributor = {
  login: string;
  avatar_url: string;
};

const parseContributors = (rawValue: string): Contributor[] => {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.flatMap((entry) => {
      if (typeof entry !== "object" || entry === null) {
        return [];
      }

      const contributor = entry as Record<string, unknown>;

      if (typeof contributor.login !== "string" || contributor.login === "") {
        return [];
      }

      return [
        {
          login: contributor.login,
          avatar_url:
            typeof contributor.avatar_url === "string"
              ? contributor.avatar_url
              : ""
        }
      ];
    });
  } catch {
    return [];
  }
};

export const getContributors = async (
  repository: string
): Promise<Contributor[]> => {
  const storedValue = await redis.hget("contributors", repository);

  if (!storedValue) {
    return [];
  }

  return parseContributors(storedValue);
};

export const getAllContributors = async (): Promise<
  Record<string, Contributor[]>
> => {
  const storedValue = await redis.hgetall("contributors");
  const contributorsByRepository: Record<string, Contributor[]> = {};

  for (const [repository, rawContributors] of Object.entries(storedValue)) {
    contributorsByRepository[repository] = parseContributors(rawContributors);
  }

  return contributorsByRepository;
};
