const routes = (app) => {
  app.use("/livros", require("./routes/livros"));
  return;
};

module.exports = routes;
