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
      this.chartOption = {
        backgroundColor: attribute.backgroundColor,
        title: {
          text: attribute.title.text,
          textStyle: {
            align: attribute.title.textStyle.align,
            color: attribute.title.textStyle.color,
            fontSize: attribute.title.textStyle.fontSize,
          },
          top: attribute.title.top,
          left: attribute.title.left,
        },
        grid: {
          top: attribute.grid.top,
          left: attribute.grid.left,
          right: attribute.grid.right,
          bottom: attribute.grid.bottom,
        },
        xAxis: [
          {
            type: attribute.xAxis[0].type,
            axisLine: {
              show: attribute.xAxis[0].axisLine.show,
            },
            axisLabel: {
              color: attribute.xAxis[0].axisLabel.color,
            },
            boundaryGap: attribute.xAxis[0].boundaryGap,
            data: this.chartData.dataText.xAxisData,
          },
        ],
        yAxis: [
          {
            type: attribute.yAxis[0].type,
            axisLine: {
              show: attribute.yAxis[0].axisLine.show,
            },
          },
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 25,
            lineStyle: {
              normal: {
                color: "#6c50f3",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#6c50f3",
              },
            },
            itemStyle: {
              color: "#6c50f3",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: false,
            },
            data: this.chartData.dataText.series[0],
          },
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 25,
            lineStyle: {
              normal: {
                color: "#00ca95",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#00ca95",
              },
            },

            itemStyle: {
              color: "#00ca95",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: false,
            },
            data: this.chartData.dataText.series[1],
          },
        ],
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