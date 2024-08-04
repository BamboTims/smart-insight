<template>
  <div class="post-list">
    <div
      v-if="loading"
      class="loading"
    >
      Loading Posts...
    </div>
    <ul v-if="!loading && posts.length">
      <li
        v-for="post in posts"
        :key="post.id"
      >
        <router-link :to="'/post/' + post.id">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
    <div
      v-if="!loading && error"
      class="error"
    >
      {{ error }}
    </div>
    <div
      v-if="!loading && posts.length === 0"
      class="no-data"
    >
      No Posts found
    </div>
    <div class="pagination">
      <button
        @click="fetchPosts(page - 1)"
        :disabled="page === 1 || loading"
      >
        Previous
      </button>
      <span>Page {{ page }}</span>
      <button
        @click="fetchPosts(page + 1)"
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
  props: ["autobotId"],
  data() {
    return {
      posts: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchPosts(this.page);
  },
  methods: {
    async fetchPosts(page) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/autobots/${this.autobotId}/posts`,
          {
            params: { page, limit: this.limit },
          }
        );
        this.posts = response.data.posts;
        this.total = response.data.total;
        this.page = page;
      } catch (error) {
        this.error =
          "Error fetching posts: " +
          (error.response ? error.response.data : error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.post-list {
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
