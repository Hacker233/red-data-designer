import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/components/index.js"; // 注册全局组件

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
