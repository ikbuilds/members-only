import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const PgStore = connectPgSimple(session);

const sessionMiddleware = session({
  store: new PgStore({
    pool,
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

export default sessionMiddleware;
