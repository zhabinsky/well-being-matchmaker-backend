import { cleanEnv, str } from "envalid";

require("dotenv").config();

export const env = cleanEnv(process.env, {
  AUTH_COOKIE_PREFIX: str(),
  DATABASE_URL: str({ desc: "Postgresql connection url" }),
});
