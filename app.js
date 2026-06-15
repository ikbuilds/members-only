import "dotenv/config";
import express from "express";
import cors from "cors";
import expressEJSLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import passport from "./config/passport.js";
import localsMiddleware from "./middleware/locals.js";
import errorHandler from "./middleware/error.js";
import sessionMiddleware from "./config/sessionMiddleware.js";

import indexRouter from "./routes/indexRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

app.use(cors());
app.use(sessionMiddleware);
app.use(passport.session());
app.use(expressEJSLayouts);
app.use(localsMiddleware);

// Routes
app.use("/", indexRouter);

app.use(errorHandler);

export default app;
