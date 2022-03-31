import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from "element-ui";
import "@/theme/theme/index.css";

import * as echarts from "echarts";

import { registerOption } from "@/components/registerOption";

import "@/assets/iconfont/iconfont.css"; // 图标
import "@/style/index.css";
import "normalize.css";

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);
registerOption();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
