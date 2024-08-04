const express = require("express");
const { Autobot, Post, Comment } = require("../models");

const router = express.Router();

router.get("/autobots", async (req, res) => {
  const autobots = await Autobot.findAll({ limit: 10 });
  res.json(autobots);
});

router.get("/autobots/:id/posts", async (req, res) => {
  const posts = await Post.findAll({
    where: { autobot_id: req.params.id },
    limit: 10,
  });
  res.json(posts);
});

router.get("/posts/:id/comments", async (req, res) => {
  const comments = await Comment.findAll({
    where: { post_id: req.params.id },
    limit: 10,
  });
  res.json(comments);
});

module.exports = router;
