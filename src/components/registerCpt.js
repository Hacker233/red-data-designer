import Vue from "vue";
import cpt_chart_line from "@/components/echarts/cpt-chart-line";

let cptList = [cpt_chart_line];

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
