import { matchedData, validationResult } from "express-validator";
import prisma from "../config/prisma.js";

// GET MESSAGES PAGE
const getMessagesPage = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.session.error = errors.array()[0].msg; // Long search query error

    return req.session.save((err) => {
      if (err) return next(err);

      res.redirect("/messages");
    });
  }

  const { q } = matchedData(req);

  const where = q
    ? {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const messages = await prisma.message.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });

  res.render("messages", { title: "Murmur | Messages", messages });
};

// CREATE MESSAGE
const createMessage = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("createMessage", {
      title: "Murmur | Create Message",
      data: req.body,
      errors: errors.mapped(),
    });
  }

  const { title, content } = matchedData(req);

  await prisma.message.create({
    data: {
      title,
      content,
      authorId: req.user.id,
    },
  });

  res.redirect("/messages");
};

// DELETE MESSAGE
const deleteMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.session.error = errors.array()[0].msg;

      return req.session.save((err) => {
        if (err) return next(err);
        res.redirect("/messages");
      });
    }

    const { id } = matchedData(req);

    await prisma.message.delete({
      where: { id },
    });

    req.session.success = "Message deleted successfully.";

    req.session.save((err) => {
      if (err) return next(err);

      res.redirect("/messages");
    });
  } catch (err) {
    if (err?.code === "P2025") {
      req.session.error = "Message not found.";

      return req.session.save((err) => {
        if (err) return next(err);
        res.redirect("/messages");
      });
    }

    next(err);
  }
};

// DELETE ALL MESSAGES
const deleteAllMessages = async (req, res, next) => {
  await prisma.message.deleteMany();
  req.session.success = "All messages has been deleted successfully.";

  req.session.save((err) => {
    if (err) return next(err);

    res.redirect("/messages");
  });
};

export { getMessagesPage, deleteMessage, deleteAllMessages, createMessage };
