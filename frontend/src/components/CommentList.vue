<template>
  <div class="comment-list">
    <ul>
      <li
        v-for="comment in comments"
        :key="comment.id"
      >
        <strong>{{ comment.name }} ({{ comment.email }})</strong>
        <p>{{ comment.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["postId"],
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${this.postId}/comments`
        );
        this.comments = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
  },
};
</script>

<style scoped>
.comment-list {
  margin-top: 20px;
}
</style>
