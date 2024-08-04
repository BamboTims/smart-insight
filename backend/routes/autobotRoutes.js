const express = require("express");
const { Autobot, Post, Comment } = require("../models");

const router = express.Router();

const paginate = (model, options) => {
  const { page = 1, limit = 10 } = options;
  const offset = (page - 1) * limit;

  return model.findAndCountAll({
    ...options,
    limit,
    offset,
  });
};

router.get("/autobots", async (req, res) => {
  const { page, limit } = req.query;
  const { count, rows } = await paginate(Autobot, { page, limit });
  res.json({ total: count, autobots: rows });
});

router.get("/autobots/:id/posts", async (req, res) => {
  const { page, limit } = req.query;
  const { count, rows } = await paginate(Post, {
    where: { autobot_id: req.params.id },
    page,
    limit,
  });
  res.json({ total: count, posts: rows });
});

router.get("/posts/:id/comments", async (req, res) => {
  const { page, limit } = req.query;
  const { count, rows } = await paginate(Comment, {
    where: { post_id: req.params.id },
    page,
    limit,
  });
  res.json({ total: count, comments: rows });
});

module.exports = router;
