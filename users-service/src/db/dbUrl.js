import accessEnv from "#root/helpers/accessEnv";
export const dbURI = accessEnv("DB_URI");
export const redisPort = accessEnv("REDISPORT");
export const redisHost = accessEnv("REDISHOST");
