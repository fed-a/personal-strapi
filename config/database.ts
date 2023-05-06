import path from "path";
import { getEnv } from "./get-env";

export default ({ env }) => {
  console.log("---START---");
  getEnv(env, "NODE_ENV");
  const client = getEnv(env, "DATABASE_CLIENT", "sqlite");

  const connections = {
    mysql: {
      connection: {
        connectionString: getEnv(env, "DATABASE_URL"),
        host: getEnv(env, "DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 3306),
        database: getEnv(env, "DATABASE_NAME", "strapi"),
        user: getEnv(env, "DATABASE_USERNAME", "strapi"),
        password: getEnv(env, "DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", false) && {
          key: env("DATABASE_SSL_KEY", undefined),
          cert: env("DATABASE_SSL_CERT", undefined),
          ca: env("DATABASE_SSL_CA", undefined),
          capath: env("DATABASE_SSL_CAPATH", undefined),
          cipher: env("DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true
          ),
        },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    postgres: {
      connection: {
        connectionString: getEnv(env, "DATABASE_URL"),
        host: getEnv(env, "DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: getEnv(env, "DATABASE_NAME", "strapi"),
        user: getEnv(env, "DATABASE_USERNAME", "strapi"),
        password: getEnv(env, "DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", false) && {
          key: env("DATABASE_SSL_KEY", undefined),
          cert: env("DATABASE_SSL_CERT", undefined),
          ca: env("DATABASE_SSL_CA", undefined),
          capath: env("DATABASE_SSL_CAPATH", undefined),
          cipher: env("DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true
          ),
        },
        schema: getEnv(env, "DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          getEnv(env, "DATABASE_FILENAME", "data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
