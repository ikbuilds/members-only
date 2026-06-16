import { body } from "express-validator";

const messages = {
  requiredErr: (field) => `${field} must be provided.`,
  minimumErr: (field, min) => ` must not be less than ${min} characters.`,
  maximumErr: (field, min) => ` must not be more than ${max} characters.`,
  betweenErr: (field, min, max) =>
    ` must not be between ${min} and ${max} characters.`,
  matchErr: (field) => `${field} must match your password.`,
  invalidErr: (field) => `${field} must be a valid email address.`,
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
    .withMessage(messages.invalidErr("Email")),
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

export { signupValidator, loginValidator };
