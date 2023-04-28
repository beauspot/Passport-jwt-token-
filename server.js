import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { StatusCodes } from "http-status-codes";
import MongodbSession from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();
import connectDB from "./config/dbConfig.js";
import __404_err_page from "./middleware/notfound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import privateRoute from "./routes/privateRoute.js";

const app = express();
const MongoDBStore = MongodbSession(session);
const storemD = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "Passport-Sessions-Collection",
  ttl: 60 * 60, // session will expire in 1hr
});
// Middleware functions
app.use(
  session({
    resave: false,
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false,
    store: storemD,
    cookie: {
      sameSite: "strict",
      secure: false, // use true if using https
      maxAge: 1000 * 60 * 60, // cookie would expire in 1 hour
    },
  })
);
app.use(xss());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/routes/private", privateRoute);

app.get("/", (req, res, next) => {
  res.status(StatusCodes.OK).send("Hello World");
});

app.use(errorHandlerMiddleware);
app.use("*", __404_err_page);

const Port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(Port, () =>
      console.log(`Server Listening on localhost:${Port}`)
    );
  } catch (error) {
    console.error(error.message);
  }
};

startServer();
