const localsMiddleware = (req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success = req.session?.success || null;
  res.locals.error = req.session?.error || null;

  if (req.session) {
    delete req.session.success;
    delete req.session.error;
  }

  next();
};

export default localsMiddleware;
