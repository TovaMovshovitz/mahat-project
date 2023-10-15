require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3600;

app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tag", require("./routes/tagRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/ingredient", require("./routes/ingredientRoutes"));
app.use("/api/measuringUtensil", require("./routes/measuringUtensilRoutes"));
app.use("/api/step", require("./routes/stepRoutes"));
app.use("/api/recipe", require("./routes/recipeRoutes"));
// app.use("/api/recipe", require("./routes/searchRecipeRoutes"));//search recipe
app.use("/api/upload", require("./routes/uploadRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// app.use(require("./middleware/errorHandler"));
app.listen(PORT, () => console.log("server runing"));
