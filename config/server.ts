import { getEnv } from "./get-env";

export default ({ env }) => ({
  host: getEnv(env, "HOST", "0.0.0.0"),
  port: env.int("PORT", 1330),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
