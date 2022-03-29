<template>
  <!-- 组件列表 -->
  <div class="component-bar-box">
    <div v-for="(item, index) in componentsList" :key="index">
      <div
        v-for="(child, childIndex) in item.list"
        :key="childIndex"
        draggable="true"
        @dragstart="dragStart($event, child)"
        @dragend="dragEnd"
        @drag="drag"
      >
        <components :is="child.name"></components>
      </div>
    </div>
  </div>
</template>
<script>
import componentsList from "@/config/components";
export default {
  data() {
    return {
      componentsList: componentsList,
    };
  },
  methods: {
    dragStart(e, child) {
      console.log("拖拽开始", e, child);
      e.dataTransfer.setData("itemData", JSON.stringify(child));
    },
    // 拖拽结束
    dragEnd(e) {
      console.log("拖拽结束", e);
    },
    // 拖拽中
    drag(e) {
      // console.log("拖拽中", e);
    },
    // 拖拽开始
    dragstart(e) {
      console.log(e);
    },
  },
};
</script>