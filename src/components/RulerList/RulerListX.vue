<template>
  <div class="ruler-listX-box">
    <li :class="[{ long: index % 10 === 0 }]" v-for="index in 500" :key="index">
      <span v-if="index % 10 === 0">{{ index * 10 }}</span>
    </li>
  </div>
</template>
<style lang="less" scoped>
.ruler-listX-box {
  width: 100%;
  height: 22px;
  background-color: #27343e;
  position: sticky;
  top: 0;
  left: 0;
  color: #fff;
  z-index: 990;
  display: flex;
  flex-wrap: nowrap;
  li {
    height: 6px;
    width: 1px;
    margin-right: 9px;
    padding: 0;
    list-style: none;
    border: none;
    background-color: #fff;
    position: relative;
    span {
      color: #fff;
      font-size: 9px;
      position: absolute;
      top: 12px;
      left: 3px;
      zoom: 0.8;
    }
  }
  .long {
    height: 12px;
  }
}
</style>