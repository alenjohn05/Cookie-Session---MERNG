const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../Store/redis");

const RedisStore = connectRedis(session);

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: true, // if true: prevents client side JS from reading the cookie
    maxAge: 100 * 100 * 1, // session max age in milliseconds
    // explicitly set cookie to lax
    // to make sure that all cookies accept it
    // you should never use none anyway
    sameSite: "lax",
  },
});
