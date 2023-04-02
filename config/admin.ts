import { getEnv } from "./get-env";

export default ({ env }) => ({
  auth: {
    secret: getEnv(env, "ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: getEnv(env, "API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: getEnv(env, "TRANSFER_TOKEN_SALT"),
    },
  },
});
