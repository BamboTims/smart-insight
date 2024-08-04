const express = require("express");
const rateLimit = require("express-rate-limit");
const { sequelize } = require("./model");
const autobotRoutes = require("./routes/autobotRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again after a minute",
});

app.use("/api", limiter);

app.use("/api", autobotRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
