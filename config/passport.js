import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const passportConfig = {
  usernameField: "identifier",
};

const verifyCallback = async (identifier, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      return done(null, false, {
        message: "Invalid credentials",
      });
    }

    const passwordMatches = await bcryptjs.compare(password, user.password);

    if (!passwordMatches) {
      return done(null, false, {
        message: "Invalid credentials",
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const serializeUser = (user, done) => {
  done(null, user.id);
};

const deserializeUser = async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    done(null, user);
  } catch (error) {
    done(error);
  }
};

passport.use(new LocalStrategy(passportConfig, verifyCallback));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
