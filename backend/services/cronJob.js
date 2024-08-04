const { Autobot, Post, Comment } = require("../models");
const axios = require("axios");
const cron = require("node-cron");

const generateAutobots = async () => {
  for (let i = 0; i < 500; i++) {
    const userResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const postsResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const commentsResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const user =
      userResponse.data[Math.floor(Math.random() * userResponse.data.length)];
    const autobot = await Autobot.create({
      name: user.name,
      email: user.email,
    });

    const selectedPosts = postsResponse.data.slice(0, 10);
    for (const post of selectedPosts) {
      const newPost = await Post.create({
        autobot_id: autobot.id,
        title: post.title,
        body: post.body,
      });

      const selectedComments = commentsResponse.data.slice(0, 10);
      for (const comment of selectedComments) {
        await Comment.create({
          post_id: newPost.id,
          name: comment.name,
          email: comment.email,
          body: comment.body,
        });
      }
    }
  }
};

// Schedule the cron job to run every hour
cron.schedule("0 * * * *", generateAutobots);

module.exports = { generateAutobots };
