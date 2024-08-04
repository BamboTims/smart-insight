<template>
  <div class="dashboard">
    <AutobotCounter />
    <AutobotList />
  </div>
</template>

<script>
import AutobotCounter from "../components/AutobotCounter.vue";
import AutobotList from "../components/AutobotList.vue";

export default {
  components: {
    AutobotCounter,
    AutobotList,
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}
</style>
