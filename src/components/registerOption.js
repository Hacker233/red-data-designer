import Vue from "vue";
import base_chart_line_option from "@/components/echarts/options/base-chart-line-option";

let cptOptionsList = [base_chart_line_option];

export function registerOption() {
  cptOptionsList.forEach((ele) => {
    Vue.component(ele.name, ele);
  });
}
