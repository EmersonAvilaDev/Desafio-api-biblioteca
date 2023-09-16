const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  customCssUrl: "./swagger-ui.css",
};
const swaggerFile = require("./swagger/swagger_output.json");

const usersRouter = require("./routes/users");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  /* #swagger.ignore = true */ res.redirect("/api-doc");
});
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, swaggerOptions)
);
app.use("/users", usersRouter);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;