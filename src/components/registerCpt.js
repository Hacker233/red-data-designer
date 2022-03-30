import Vue from "vue";
import cpt_text from "@/components/element/cpt-text";
import cpt_chart_column from "@/components/echarts/cpt-chart-column";
import cpt_chart_pie from "@/components/echarts/cpt-chart-pie";
import cpt_chart_clock from "@/components/echarts/cpt-chart-clock";
import cpt_dataV_border from "@/components/dataV/cpt-dataV-border";
import cpt_dataV_scrollTable from "@/components/dataV/cpt-dataV-scrollTable";
import cpt_dataV_scrollList from "@/components/dataV/cpt-dataV-scrollList";
import cpt_chart_mapGc from "@/components/echarts/cpt-chart-mapGc";
import cpt_chart_mapMigrate from "@/components/echarts/cpt-chart-mapMigrate";
import cpt_dataV_waterLevel from "@/components/dataV/cpt-dataV-waterLevel";
import cpt_dataV_decoration from "@/components/dataV/cpt-dataV-decoration";
import cpt_chart_line from "@/components/echarts/cpt-chart-line";
import cpt_dataV_digitalFlop from "@/components/dataV/cpt-dataV-digitalFlop";
import cpt_dataV_percentPond from "@/components/dataV/cpt-dataV-percentPond";
import cpt_chart_tdColumn from "@/components/echarts/cpt-chart-tdColumn";
import cpt_dataV_activeRing from "@/components/dataV/cpt-dataV-activeRing";
import cpt_chart_gauge from "@/components/echarts/cpt-chart-gauge";
import cpt_chart_funnel from "./echarts/cpt-chart-funnel.vue"; // 漏斗图
import dataV_canical from "./dataV/dataV-conical.vue"; // 锥形柱状图

let cptList = [
  cpt_dataV_border,
  cpt_text,
  cpt_chart_column,
  cpt_chart_tdColumn,
  cpt_chart_pie,
  cpt_chart_clock,
  cpt_dataV_scrollTable,
  cpt_dataV_scrollList,
  cpt_chart_mapGc,
  cpt_chart_mapMigrate,
  cpt_dataV_waterLevel,
  cpt_dataV_decoration,
  cpt_chart_line,
  cpt_dataV_digitalFlop,
  cpt_dataV_percentPond,
  cpt_dataV_activeRing,
  cpt_chart_gauge,
  cpt_chart_funnel,
  dataV_canical
];

let cptGroups = {};
cptList.forEach((ele) => {
  Vue.component(ele.name, ele);
  const title = ele.title ? ele.title : "未命名组件";
  const initWidth = ele.initWidth ? ele.initWidth : 400;
  const initHeight = ele.initHeight ? ele.initHeight : 300;
  const group = ele.group ? ele.group : "default";
  cptGroups[group] = cptGroups[group] ? cptGroups[group] : [];
  cptGroups[group].push({
    group: group,
    title: title,
    name: ele.name,
    icon: ele.icon,
    initWidth: initWidth,
    initHeight: initHeight,
  });
});
export default cptGroups;
