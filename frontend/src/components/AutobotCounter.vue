<template>
  <div class="autobot-counter">
    <h2>Total Autobots Created: {{ autobotCount }}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      autobotCount: 0,
    };
  },
  created() {
    this.fetchAutobotCount();
  },
  methods: {
    async fetchAutobotCount() {
      try {
        const response = await axios.get("http://localhost:3000/api/autobots");
        this.autobotCount = response.data.length;
      } catch (error) {
        console.error("Error fetching Autobot count:", error);
      }
    },
  },
};
</script>

<style scoped>
.autobot-counter {
  text-align: center;
  margin-top: 20px;
}
</style>
