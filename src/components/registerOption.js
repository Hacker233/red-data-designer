import Vue from "vue";
import cpt_chart_line_option from "@/components/echarts/options/cpt-chart-line-option";

let cptOptionsList = [cpt_chart_line_option];

export function registerOption() {
  cptOptionsList.forEach((ele) => {
    Vue.component(ele.name, ele);
  });
}
