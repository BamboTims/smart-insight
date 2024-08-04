const express = require("express");
const { sequelize } = require("./models");
const autobotRoutes = require("./routes/autobotRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
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
