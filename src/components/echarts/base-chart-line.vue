<template>
  <div :id="uuid" class="chart-box"></div>
</template>
<script>
export default {
  name: "base-chart-line",
  title: "折线图",
  icon: "pig-zhexiantu",
  group: "chart",
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  data() {
    return {
      uuid: "",
      chartOption: null, // 图表配置
      chart: null,
      chartData: [],
    };
  },
  watch: {
    // 属性改变，重新绘制
    "option.attribute": {
      handler(obj, newObj) {
        this.initChart(newObj);
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
    this.uuid = require("uuid").v1();
  },
  mounted() {
    // 初始化chart
    this.chart = this.$echarts.init(document.getElementById(this.uuid));
    // 初始化数据
    this.chartData = this.option.dataForm;
    // 初始化图表
    this.initChart(this.option.attribute);
  },
  methods: {
    // 初始化图表
    initChart(attribute) {
      let series = [];
      console.log("this.chartData.data.series",this.chartData.data.series)
      this.chartData.data.series.forEach((item) => {
        series.push({
          data: item,
          type: "line",
        });
      });
      this.chartOption = {
        xAxis: {
          type: attribute.xAxis.type,
          data: this.chartData.data.xAxisData,
        },
        yAxis: {
          type: attribute.yAxis.type,
        },
        series: series,
      };
      this.chart.setOption(this.chartOption);
    },
  },
};
</script>
<style lang="less" scoped>
.chart-box {
  width: 100%;
  height: 100%;
}
</style>