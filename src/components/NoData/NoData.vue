<template>
  <div class="no-data-box">
    <i class="iconfont pig-meiyougengduo"></i>
    <p>{{ msg }}</p>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>
<style lang="less" scoped>
.no-data-box {
  width: 100%;
  min-height: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  .iconfont {
    font-size: 60px;
    color: #2681ff;
  }
  p {
    margin: 10px 0;
    font-size: 12px;
    color: #2681ff;
    letter-spacing: 2px;
  }
}
</style>