// 批量注册组件
import Vue from "vue";
import demo from "./demo/index.vue";

let componentsList = [demo];
componentsList.forEach((item) => {
  Vue.component(item.name, item);
});
