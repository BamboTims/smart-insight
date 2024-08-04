<template>
  <div class="autobot-detail">
    <h2>{{ autobot.name }}'s Posts</h2>
    <PostList :autobotId="autobot.id" />
  </div>
</template>

<script>
import axios from "axios";
import PostList from "../components/PostList.vue";

export default {
  components: {
    PostList,
  },
  data() {
    return {
      autobot: {},
    };
  },
  created() {
    this.fetchAutobot();
  },
  methods: {
    async fetchAutobot() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/autobots/${this.$route.params.id}`
        );
        this.autobot = response.data;
      } catch (error) {
        console.error("Error fetching Autobot details:", error);
      }
    },
  },
};
</script>

<style scoped>
.autobot-detail {
  margin-top: 20px;
}
</style>
