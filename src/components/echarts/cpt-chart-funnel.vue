<template>
  <div style="width: 100%; height: 100%" :id="uuid"></div>
</template>

<script>
import { getDataStr, pollingRefresh } from "@/utils/refreshCptData";
export default {
  name: "cpt-chart-funnel",
  title: "漏斗图",
  icon: "el-icon-data-line",
  group: "chart", // 组件分组标识
  initWidth: 500, // 初始化宽度
  initHeight: 500, // 初始化高度
  props: {
    width: Number,
    height: Number,
    option: Object, // 自定义组件的属性和数据源
  },
  data() {
    return {
      uuid: "", // 唯一标识
      chartOption: {},
      chart: null,
      cptData: 0,
    };
  },
  watch: {
    "option.attribute": {
      handler(obj, newObj) {
        this.loadChart(newObj);
      },
      deep: true, //深度监听
    },
    width() {
      this.chart.resize();
    },
    height() {
      this.chart.resize();
    },
  },
  created() {
    this.uuid = require("uuid").v1(); // 生成组件唯一标识
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById(this.uuid)); // 初始化echarts
    this.refreshCptData(); // 刷新属性栏数据
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData);
    },
    loadData() {
      getDataStr(this.option.cptDataForm).then((res) => {
        this.cptData = JSON.parse(res);
        console.log("this.cptData", this.cptData);
        this.loadChart(this.option.attribute);
      });
    },
    loadChart(attribute) {
      const that = this;
      that.chartOption = {
        title: {
          text: attribute.title,
        },
        tooltip: {
          trigger: attribute.trigger,
          formatter: attribute.formatter,
        },
        legend: {
          data: attribute.legend,
        },
        series: [
          {
            name: attribute.name,
            type: attribute.type,
            left: attribute.left,
            top: attribute.top,
            bottom: attribute.bottom,
            width: attribute.width,
            min: attribute.min,
            max: attribute.max,
            minSize: attribute.minSize,
            maxSize: attribute.maxSize,
            sort: attribute.sort,
            gap: attribute.gap,
            label: {
              show: true,
              position: "inside",
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: this.cptData,
          },
        ],
      };
      console.log("漏斗数据", this.chartOption);
      that.chart.setOption(that.chartOption);
    },
  },
};
</script>