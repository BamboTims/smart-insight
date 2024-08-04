const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const Autobot = require("./autobot")(sequelize);
const Post = require("./post")(sequelize);
const Comment = require("./comment")(sequelize);

Autobot.hasMany(Post, { foreignKey: "autobot_id" });
Post.belongsTo(Autobot, { foreignKey: "autobot_id" });

Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

sequelize.sync({ alter: true });

module.exports = { sequelize, Autobot, Post, Comment };
