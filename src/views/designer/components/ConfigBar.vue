<template>
  <div class="config-bar-box">
    <el-row>
      <el-tabs v-model="configTab" type="card" :stretch="true">
        <el-tab-pane label="基础设置" name="basic" v-if="cptDataFormShow">
          <el-form
            label-width="90px"
            label-position="left"
            size="mini"
          >
            <el-form-item label="图表宽度">
              <el-input-number
                :min="20"
                :max="2000"
                v-model="currentPosition.cptWidth"
                size="mini"
                @change="changeConfig"
              />
            </el-form-item>
            <el-form-item label="图表高度">
              <el-input-number
                :min="20"
                :max="1500"
                v-model="currentPosition.cptHeight"
                size="mini"
                @change="changeConfig"
              />
            </el-form-item>
            <el-form-item label="图表X轴">
              <el-input-number
                :min="-500"
                :max="2500"
                v-model="currentPosition.cptX"
                size="mini"
                @change="changeConfig"
              />
            </el-form-item>
            <el-form-item label="图表Y轴">
              <el-input-number
                :min="-500"
                v-model="currentPosition.cptY"
                size="mini"
                @change="changeConfig"
              />
            </el-form-item>
            <el-form-item label="图表Z轴">
              <el-input-number
                :min="1"
                :max="1800"
                v-model="currentPosition.cptZ"
                size="mini"
                @change="changeConfig"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="属性" name="custom" v-if="cptDataFormShow">
          <div class="customForm" v-if="currentCpt && currentCpt.option">
            <comment
              :is="currentCpt.cptName + '-option'"
              :attribute="currentCpt.option.attribute"
            ></comment>
          </div>
        </el-tab-pane>
        <!-- 展示数据表单需在option.js初始化cptDataForm -->
        <el-tab-pane label="数据" name="data" v-if="cptDataFormShow">
          <div class="customForm">
            <el-form size="mini" label-position="top">
              <el-form-item label="数据类型">
                <el-radio-group
                  v-model="currentCpt.option.dataForm.dataSource"
                >
                  <el-radio :label="1">静态数据</el-radio>
                  <el-radio :label="2">接口</el-radio>
                  <el-radio :label="3">sql</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="轮询">
                <el-switch
                  v-model="dataPollEnable"
                  active-text="开启"
                  inactive-text="关闭"
                />
              </el-form-item>
              <el-form-item label="轮询时间(s)" v-show="dataPollEnable">
                <el-input-number
                  v-model="currentCpt.option.dataForm.pollTime"
                  :min="0"
                  :max="100"
                  label="描述文字"
                />
              </el-form-item>
              <el-form-item
                :label="
                  dataLabels[currentCpt.option.dataForm.dataSource - 1]
                "
              >
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="currentCpt.option.dataForm.dataText"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="refreshCptData"
                  >刷新数据</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import NoData from "@/components/NoData/NoData.vue";
import ScreenSetting from "./ScreenSetting.vue";
export default {
  name: "configBar",
  props: {
    currentCpt: Object,
  },
  data() {
    return {
      cptDataFormShow: false,
      configTab: "custom",
      currentPosition: {
        cptWidth: 30,
        cptHeight: 30,
        cptX: 0,
        cptY: 0,
        cptZ: 0,
      },
      dataLabels: ["数据", "接口地址", "sql"],
      configBarShow: false,
    };
  },
  components: {
    NoData,
    ScreenSetting,
  },
  watch: {
    currentCpt(newVal) {
      this.cptDataFormShow = false;
      console.log("newVal", newVal);
      if (!newVal) {
        //清空时
        this.configBarShow = false;
      } else {
        if (this.currentCpt.option.dataForm) {
          this.cptDataFormShow = true;
        } else {
          this.configTab = "custom"; //解決上一組件沒有数据表单导致tab栏未选中bug
        }
      }
    },
  },
  computed: {
    dataPollEnable: {
      get() {
        return !!(
          this.currentCpt.option.dataForm &&
          this.currentCpt.option.dataForm.pollTime &&
          this.currentCpt.option.dataForm.pollTime !== 0
        );
      },
      set(newValue) {
        if (newValue) {
          this.currentCpt.option.dataForm.pollTime = 8;
        } else {
          this.currentCpt.option.dataForm.pollTime = 0;
          this.refreshCptData(); //清除定时器
        }
        return newValue;
      },
    },
  },
  methods: {
    // 刷新数据，调用父组件(index)中refreshCptData方法
    // 在父组件中再调用选中图层中的refreshCptData方法
    // 图层中的refreshCptData方法再自行调后端接口渲染数据，文本框的内容和数据类型组装在option.cptDataForm中
    refreshCptData() {
      this.$emit("refreshCptData");
    },
    showConfigBar() {
      this.configBarShow = true;
    },
    updateData(currentPosition) {
      this.currentPosition = currentPosition;
      // console.log("刷新属性栏数据",this.currentPosition.cptX,this.currentPosition.cptY)
    },
    changeConfig() {
      console.log("修改坐标", this.cptDataFormShow);
      if (this.cptDataFormShow) {
        this.$emit("change", this.currentPosition);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.config-bar-box {
  color: #fff;
  /deep/ .el-tabs__content {
    padding: 20px 20px;
    box-sizing: border-box;
  }
}
/deep/ .el-tabs__header {
  position: sticky;
  top: 35px;
  background-color: #fff;
  z-index: 999;
}
/deep/ .el-form-item__label {
  color: #fff;
}
.customForm {
  padding: 0 6px 0 4px;
  overflow: auto;
}
.configTs-enter-active,
.configTs-leave-active {
  transition: all 0.3s;
}
.configTs-enter,
.configTs-leave-to {
  opacity: 0;
  transform: scale(0.3);
  transform-origin: right bottom;
}
</style>
