const cptOptions = {
  chart: {
    name: "基础图表",
    icon: "pig-zhexiantu",
    opened: true,
    options: {
      "base-chart-line": {
        dataForm: {
          dataSource: 1, // 数据来源
          pollTime: 0, // 是否轮询
          dataText: {
            xAxisData: ["A", "B", "C", "D", "E", "F"],
            series: [
              [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
              [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
            ],
          },
        },
        attribute: {
          backgroundColor: "#080b30",
          title: {
            text: "哎呦,不错哦",
            textStyle: {
              align: "center",
              color: "#fff",
              fontSize: 20,
            },
            top: "5%",
            left: "center",
          },
          grid: {
            top: "15%",
            left: "5%",
            right: "5%",
            bottom: "15%",
            // containLabel: true
          },
          xAxis: [
            {
              type: "category",
              axisLine: {
                show: true,
              },
              axisLabel: {
                color: "#fff",
              },
              boundaryGap: false,
              data: ["A", "B", "C", "D", "E", "F"],
            },
          ],

          yAxis: [
            {
              type: "value",
              min: 0,
              // max: 140,
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,0.1)",
                },
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: false,
                margin: 20,
                textStyle: {
                  color: "#d1e6eb",
                },
              },
              axisTick: {
                show: false,
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
              data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
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
              data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
            },
          ],
        },
      },
    },
  },
};
export default cptOptions;
