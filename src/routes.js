const routes = (app) => {
  app.use("/livro", require("./routes/livros"));
  return;
};

module.exports = routes;
