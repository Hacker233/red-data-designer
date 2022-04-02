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
          data: {
            xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            series: [
              [150, 230, 224, 218, 135, 147, 260],
            ],
          },
        },
        attribute: {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: "line",
            },
          ],
        },
      },
    },
  },
};
export default cptOptions;
