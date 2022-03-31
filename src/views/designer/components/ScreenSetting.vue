<template>
  <!-- 没有选中组件时,默认展示大屏设置 -->
  <div class="screen-setting-box">
    <!-- 头部 -->
    <div class="screen-title">
      <i class="iconfont pig-changyong_shezhi"></i>
    </div>
    <!-- 设置页面 -->
    <div class="screen-setting">
      <el-form
        :model="formData"
        label-width="90px"
        label-position="left"
        size="mini"
      >
        <el-form-item label="大屏名称">
          <el-input
            v-model="formData.title"
            autocomplete="off"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="屏幕比例">
          <el-select
            v-model="scale"
            placeholder="请选择"
            style="width: 100%"
            @change="scaleChange"
          >
            <el-option
              v-for="item in scaleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-color-picker v-model="formData.bgColor" show-alpha />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "configForm",
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogVisible: false,
      scale: "",
      scaleOptions: [
        { value: "21*9", label: "21 : 9" },
        { value: "18*9", label: "18 : 9" },
        { value: "16*10", label: "16 : 10" },
        { value: "16*9", label: "16 : 9" },
        { value: "5*4", label: "5 : 4" },
        { value: "4*3", label: "4 : 3" },
        { value: "3*2", label: "3 : 2" },
        { value: "1*1", label: "1 : 1" },
      ],
    };
  },
  methods: {
    opened() {
      this.scale = this.formData.scaleX + "*" + this.formData.scaleY;
      this.dialogVisible = true;
    },
    close() {
      this.$emit("cancel");
      this.dialogVisible = false;
    },
    save() {
      this.$emit("saveSittingForm", JSON.parse(JSON.stringify(this.formData)));
      this.dialogVisible = false;
    },
    scaleChange(value) {
      //关闭时待优化
      let split = value.split("*");
      this.formData.scaleX = split[0];
      this.formData.scaleY = split[1];
      this.$emit("updateScale");
    },
  },
};
</script>
<style lang="less" scoped>
// 大屏设置样式
.screen-setting-box {
  .screen-title {
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #27343e;
    border-top: 2px solid #409eff;
    .iconfont {
      color: #409eff;
    }
  }
  .screen-setting {
    padding: 20px 20px;
    box-sizing: border-box;
  }
}
</style>