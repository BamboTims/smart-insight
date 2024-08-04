<template>
  <div class="post-list">
    <ul>
      <li
        v-for="post in posts"
        :key="post.id"
      >
        <router-link :to="'/post/' + post.id">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["autobotId"],
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/autobots/${this.autobotId}/posts`
        );
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
};
</script>

<style scoped>
.post-list {
  margin-top: 20px;
}
</style>
