import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import passport from "../config/passport.js";

// SIGNUP PAGE
const getSignup = (req, res) => {
  res.render("auth/signup", {
    title: "Murmur | Sign up",
    data: null,
    errors: null,
  });
};

// SIGNUP
const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("auth/signup", {
      title: " | Signup",
      data: req.body,
      errors: errors.mapped(),
    });
  }

  const { firstName, lastName, username, email, password } = matchedData(req);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return res.render("auth/signup", {
      title: " | Signup",
      data: req.body,
      errors: {},
      existingUserErr:
        existingUser?.username === username
          ? "Username already in use."
          : "Email already in use.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, +process.env.SALT);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    },
  });

  req.login(user, (err) => {
    if (err) next(err);
    res.redirect("/");
  });
};

// LOGIN PAGE
const getLogin = (req, res) => {
  res.render("auth/login", {
    title: "Murmur | Login",
    data: null,
    errors: null,
    credentialsErr: null,
  });
};

// LOGIN
const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    const errors = validationResult(req);

    if (!user || !errors.isEmpty()) {
      return res.render("auth/login", {
        title: "Murmur | Login",
        credentialsErr: info?.message || null,
        data: req.body,
        errors: errors.mapped(),
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      res.redirect("/");
    });
  })(req, res, next);
};

// LOGOUT
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");

      res.redirect("/");
    });
  });
};

export { signup, login, logout, getSignup, getLogin };
