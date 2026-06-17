const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    req.session.error = "Must be an admin to perform this action.";

    return req.session.save((err) => {
      if (err) return next(err);

      res.redirect("/messages");
    });
  }

  next();
};

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }

  next();
};

export { requireAdmin, requireAuth };
