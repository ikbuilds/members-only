import { matchedData, validationResult } from "express-validator";
import prisma from "../config/prisma.js";

const membershipForm = (req, res) => {
  res.render("membership/join", {
    title: "Murmur | Become a Member",
    codeError: null,
    code: null,
  });
};

const makeMember = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("membership/join", {
      title: "Murmur | Become a Member",
      codeError: errors.array()[0],
      code: req.body.code,
    });
  }

  const code = matchedData(req);

  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      role: "MEMBER",
    },
  });

  req.session.success =
    "Membership unlocked successfully. You now have full access to member-only content.";
  res.redirect("/messages");
};

export { membershipForm, makeMember };
