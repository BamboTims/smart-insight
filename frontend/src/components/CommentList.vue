<template>
  <div class="comment-list">
    <div
      v-if="loading"
      class="loading"
    >
      Loading Comments...
    </div>
    <ul v-if="!loading && comments.length">
      <li
        v-for="comment in comments"
        :key="comment.id"
      >
        <strong>{{ comment.name }} ({{ comment.email }})</strong>
        <p>{{ comment.body }}</p>
      </li>
    </ul>
    <div
      v-if="!loading && error"
      class="error"
    >
      {{ error }}
    </div>
    <div
      v-if="!loading && comments.length === 0"
      class="no-data"
    >
      No Comments found
    </div>
    <div class="pagination">
      <button
        @click="fetchComments(page - 1)"
        :disabled="page === 1 || loading"
      >
        Previous
      </button>
      <span>Page {{ page }}</span>
      <button
        @click="fetchComments(page + 1)"
        :disabled="page * limit >= total || loading"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["postId"],
  data() {
    return {
      comments: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchComments(this.page);
  },
  methods: {
    async fetchComments(page) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${this.postId}/comments`,
          {
            params: { page, limit: this.limit },
          }
        );
        this.comments = response.data.comments;
        this.total = response.data.total;
        this.page = page;
      } catch (error) {
        this.error =
          "Error fetching comments: " +
          (error.response ? error.response.data : error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.comment-list {
  margin-top: 20px;
}
.loading,
.error,
.no-data {
  text-align: center;
  margin-top: 20px;
  color: red;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
button {
  margin: 0 5px;
}
</style>
