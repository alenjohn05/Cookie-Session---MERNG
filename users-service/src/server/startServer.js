import express from "express";
import bodyParser from "body-parser";
import session from "./MiddleWare/session";
import router from "./Routes/AuthRoutes";
import cors from "cors";
import accessEnv from "#root/helpers/accessEnv";

const app = express();

app.use(express.json());
const PORT = accessEnv("PORT", 7101);

app.use(bodyParser.json());

// Using the CORS here
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired",
    ],
    optionsSuccessStatus: 200,
  })
);

app.use(session);
app.use(router);

//Managing the Errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.info(`User service listening on ${PORT}`);
});
