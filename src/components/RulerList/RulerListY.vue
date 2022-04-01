<template>
  <div class="ruler-listY-box">
    <li :class="[{ long: index % 10 === 0 }]" v-for="index in 300" :key="index">
      <span v-if="index % 10 === 0">{{ index * 10 }}</span>
    </li>
  </div>
</template>
<style lang="less" scoped>
.ruler-listY-box {
  height: 100%;
  width: 22px;
  background-color: #27343e;
  position: sticky;
  left: 0;
  color: #fff;
  z-index: 990;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  li {
    width: 6px;
    height: 1px;
    margin-bottom: 9px;
    padding: 0;
    list-style: none;
    border: none;
    background-color: #fff;
    position: relative;
    span {
      color: #fff;
      font-size: 9px;
      transform: rotate(90deg);
      display: block;
      position: absolute;
      top: 12px;
      left: 5px;
      zoom: 0.8;
    }
  }
  .long {
    width: 12px;
  }
}
</style>