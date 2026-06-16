const getLandingPage = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/messages");
  }

  res.render("index", {
    title: "",
    messages: [],
  });
};

export { getLandingPage };
