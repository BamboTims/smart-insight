import Vue from "vue";
import Router from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import AutobotDetail from "../views/AutobotDetail.vue";
import PostDetail from "../views/PostDetail.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", component: Dashboard },
    { path: "/autobot/:id", component: AutobotDetail, props: true },
    { path: "/post/:id", component: PostDetail, props: true },
  ],
});
