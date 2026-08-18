import Redis from "ioredis";

const parseDatabase = (pathname: string) => {
  if (!pathname || pathname === "/") {
    return undefined;
  }

  const database = Number.parseInt(pathname.slice(1), 10);
  return Number.isNaN(database) ? undefined : database;
};

const allowProcessToExit = (client: Redis) => {
  client.on("ready", () => {
    client.stream?.unref();
  });

  return client;
};

const createRedis = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    return allowProcessToExit(
      new Redis({
        lazyConnect: true
      })
    );
  }

  const parsedUrl = new URL(redisUrl);

  return allowProcessToExit(
    new Redis({
      host: parsedUrl.hostname,
      port: parsedUrl.port ? Number.parseInt(parsedUrl.port, 10) : 6379,
      username: parsedUrl.username || undefined,
      password: parsedUrl.password || undefined,
      db: parseDatabase(parsedUrl.pathname),
      tls: parsedUrl.protocol === "rediss:" ? {} : undefined
    })
  );
};

export const redis = createRedis();
