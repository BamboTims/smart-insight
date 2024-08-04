<template>
  <div class="autobot-list">
    <h2>Autobots</h2>
    <div
      v-if="loading"
      class="loading"
    >
      Loading Autobots...
    </div>
    <ul v-if="!loading && autobots.length">
      <li
        v-for="autobot in autobots"
        :key="autobot.id"
      >
        <router-link :to="'/autobot/' + autobot.id">
          {{ autobot.name }} ({{ autobot.email }})
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
      v-if="!loading && autobots.length === 0"
      class="no-data"
    >
      No Autobots found
    </div>
    <div class="pagination">
      <button
        @click="fetchAutobots(page - 1)"
        :disabled="page === 1 || loading"
      >
        Previous
      </button>
      <span>Page {{ page }}</span>
      <button
        @click="fetchAutobots(page + 1)"
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
  data() {
    return {
      autobots: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchAutobots(this.page);
  },
  methods: {
    async fetchAutobots(page) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:3000/api/autobots", {
          params: { page, limit: this.limit },
        });
        this.autobots = response.data.autobots;
        this.total = response.data.total;
        this.page = page;
      } catch (error) {
        this.error =
          "Error fetching Autobots: " +
          (error.response ? error.response.data : error.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.autobot-list {
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
