import { body, param, query } from "express-validator";

const messages = {
  requiredErr: (field) => `${field} must be provided.`,
  minimumErr: (field, min) =>
    `${field} must not be less than ${min} characters.`,
  maximumErr: (field, max) =>
    `${field} must not be more than ${max} characters.`,
  betweenErr: (field, min, max) =>
    `${field} must be between ${min} and ${max} characters.`,
  matchErr: (field) => `${field} must match your password.`,
  invalidEmailErr: (field) => `${field} must be a valid email address.`,
  invalidErr: (field) => `${field} must be valid.`,
};

const signupValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("First name"))
    .bail()
    .isLength({ min: 5 })
    .withMessage(messages.minimumErr("First name", 5)),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Last name"))
    .bail()
    .isLength({ min: 5 })
    .withMessage(messages.minimumErr("Last name", 5)),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Username"))
    .bail()
    .isLength({ min: 2, max: 10 })
    .withMessage(messages.betweenErr("Username", 2, 10)),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Email"))
    .bail()
    .isEmail()
    .withMessage(messages.invalidEmailErr("Email")),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Password"))
    .bail()
    .isLength({ min: 8 })
    .withMessage(messages.minimumErr("Password", 8)),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Confirm password"))
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error(messages.matchErr("Confirm password"));
      return true;
    }),
];

const loginValidator = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Username or Email")),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Password")),
];

const searchValidator = [
  query("q")
    .optional({ falsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage(messages.maximumErr("Search query", 100)),
];

const deleteMessageValidator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("id"))
    .bail()
    .isInt()
    .withMessage(messages.invalidErr("id"))
    .toInt(),
];

const createMessageValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Title"))
    .bail()
    .isLength({ min: 5, max: 50 })
    .withMessage(messages.betweenErr("Title", 5, 50)),
  body("content")
    .trim()
    .notEmpty()
    .withMessage(messages.requiredErr("Content"))
    .bail()
    .isLength({ min: 5, max: 500 })
    .withMessage(messages.betweenErr("Content", 5, 500)),
];

export {
  signupValidator,
  loginValidator,
  searchValidator,
  deleteMessageValidator,
  createMessageValidator,
};
