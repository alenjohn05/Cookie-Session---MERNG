const redis = require("redis");
const port = require("../../db/dbUrl");
const host = require("../../db/dbUrl");
// 1 configure our redis
const redisClient = redis.createClient({
  port: port.redisPort,
  host: host.redisHost,
});

module.exports = redisClient;
