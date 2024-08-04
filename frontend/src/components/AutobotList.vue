<template>
  <div class="autobot-list">
    <h2>Autobots</h2>
    <ul>
      <li
        v-for="autobot in autobots"
        :key="autobot.id"
      >
        <router-link :to="'/autobot/' + autobot.id">
          {{ autobot.name }} ({{ autobot.email }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      autobots: [],
    };
  },
  created() {
    this.fetchAutobots();
  },
  methods: {
    async fetchAutobots() {
      try {
        const response = await axios.get("http://localhost:3000/api/autobots");
        this.autobots = response.data;
      } catch (error) {
        console.error("Error fetching Autobots:", error);
      }
    },
  },
};
</script>

<style scoped>
.autobot-list {
  margin-top: 20px;
}
</style>
