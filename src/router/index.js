import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Designer = () => import("@/views/designer/index");
const Preview = () => import("@/views/preview/index");

// 创建 router 实例，然后传 `routes` 配置
export default new VueRouter({
  //mode: 'history',
  routes: [
    {
      path: "/",
      name: "Designer",
      component: Designer,
    },
    {
      path: "/preview",
      name: "preview",
      component: Preview,
    },
    {
      path: "/view",
      name: "view",
      component: Preview,
    },
  ],
});
