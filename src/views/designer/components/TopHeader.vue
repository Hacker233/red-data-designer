<template>
  <div class="top-header-box">
    <div class="left-box"></div>
    <div class="right-box icon-box">
      <!-- 导出为图片 -->
      <el-tooltip content="下载为图片">
        <div class="save-img icon-box" @click="saveImg">
          <i class="iconfont pig-changyong_tupian"></i>
        </div>
      </el-tooltip>
      <!-- 预览 -->
      <el-tooltip content="预览">
        <div class="preview-box icon-box" @click="preview">
          <i class="iconfont pig-liulan"></i>
        </div>
      </el-tooltip>
      <!-- 保存 -->
      <el-tooltip content="保存">
        <div class="save-box icon-box" @click="submitDesign">
          <i class="iconfont pig-baocun"></i>
        </div>
      </el-tooltip>
      <!-- 删除 -->
      <el-tooltip content="删除">
        <div class="delete-box icon-box" @click="clearDesign">
          <i class="iconfont pig-shanchu1"></i>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    // 保存为图片
    saveImg() {
      this.$emit("saveImg");
    },
    // 清空
    clearDesign() {
      this.$emit("clearDesign");
    },
    // 预览
    preview() {
      this.$emit("preview");
    },
    // 预览
    submitDesign() {
      this.$emit("submitDesign");
    },
  },
};
</script>
<style lang="less" scoped>
.top-header-box {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  background-color: #1e2427;
  .right-box {
    display: flex;
    align-items: center;
    .icon-box {
      height: 100%;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #fff;
      &:hover {
        border: 1px solid #2681ff;
        color: #2681ff;
      }
      .iconfont {
        font-size: 18px;
      }
      .pig-changyong_tupian {
        font-size: 16px;
      }
      .pig-yulan1 {
        font-size: 20px;
      }
      .pig-baocun {
        font-size: 20px;
      }
      .pig-shanchu1 {
        font-size: 14px;
      }
    }
  }
}
</style>