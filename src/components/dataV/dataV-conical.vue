<template>
  <!-- 锥心柱状图 -->
  <dv-conical-column-chart
    :key="refreshFlagKey"
    :config="config"
    style="width: 100%;height: 100%"
  />
</template>
<script>
import { getDataStr, pollingRefresh } from "@/utils/refreshCptData";
export default {
  name: "dataV-conical",
  title: "锥形柱状图",
  icon: "",
  initWidth: 500,
  initHeight: 400,
  group: "chart",
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  data() {
    return {
      config: {},
      uuid: null,
      refreshFlagKey: null, // 用于刷新组件
    };
  },
  watch: {
    "option.attribute": {
      handler() {
        this.loadData();
      },
      deep: true, //深度监听
    },
    width() {
      console.log("组件宽度变化");
      this.refreshFlagKey = require("uuid").v1(); // 改变key值用于刷新组件
    },
    height() {
      this.refreshFlagKey = require("uuid").v1();
    },
  },
  created() {
    this.uuid = require("uuid").v1();
    this.refreshFlagKey = require("uuid").v1();
    this.refreshCptData();
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData);
    },
    loadData() {
      getDataStr(this.option.cptDataForm).then((res) => {
        console.log("res", res);
        this.config.data = JSON.parse(res);
        this.config.fontSize = this.option.attribute.fontSize;
        this.config.showValue = this.option.attribute.showValue;
      });
    },
  },
};
</script>