<template>
  <div class="post-detail">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <h3>Comments</h3>
    <CommentList :postId="post.id" />
  </div>
</template>

<script>
import axios from "axios";
import CommentList from "../components/CommentList.vue";

export default {
  components: {
    CommentList,
  },
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${this.$route.params.id}`
        );
        this.post = response.data;
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    },
  },
};
</script>

<style scoped>
.post-detail {
  margin-top: 20px;
}
</style>
