<template>
  <div class="designer-box">
    <div class="designer-header"></div>
    <div class="designer-center">
      <!-- 组件栏 -->
      <div class="left">
        <component-bar></component-bar>
      </div>
      <!-- 绘制区域 -->
      <div ref="center" class="center" @wheel="handleWheel">
        <div class="container">
          <!-- 绘制面板 -->
          <div
            ref="designer"
            class="designer"
            @drop="drop"
            @dragover.prevent
            :style="{
              width: designerPanel.width + 'px',
              height: designerPanel.height + 'px',
              zoom: designerPanel.containerScale,
            }"
          >
            <!-- 组件 -->
            <template v-for="(item, index) in componentsList">
              <vue-draggable-resizable
                :key="index"
                class-name="com-item"
                :parent="true"
                :x="item.x"
                :y="item.y"
                @dragstop="onDragstop"
              >
                <components :is="item.name"></components>
              </vue-draggable-resizable>
            </template>
          </div>
        </div>
      </div>
      <!-- 属性设置 -->
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
import ComponentBar from "./components/ComponentBar.vue";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
export default {
  data() {
    return {
      componentsList: [], // 渲染组件列表
      widthRatio: 1.05, // center的宽于designer的宽之比
      designerPanel: {
        containerScale: 1, // 缩放比
        width: 1920, // 宽度
        height: 1080, // 高度
      }, // 设计面板属性
    };
  },
  components: {
    ComponentBar,
    VueDraggableResizable,
  },
  mounted() {
    this.init();
    window.addEventListener("resize", () => {
      this.init();
    });
  },
  methods: {
    // 初始化绘制面板宽高
    init() {
      let centerWidth = document.documentElement.clientWidth - 540; // 中心可视区域宽度
      let designerWidth = this.$refs.designer.clientWidth; // 设计面板宽度
      this.designerPanel.containerScale = (
        centerWidth /
        this.widthRatio /
        designerWidth
      ).toFixed(2); // 确保center与designer的比例是1.1
    },
    // 放下元素
    drop(e) {
      let comItem = JSON.parse(e.dataTransfer.getData("itemData")); // 组件信息
      this.componentsList.push(comItem);
      console.log("放下元素", e, this.componentsList);
    },
    // 组件拖拽停止
    onDragstop(left, top) {
      console.log(left, top);
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(
            0.2,
            this.designerPanel.containerScale - e.deltaY / 2000
          ).toFixed(2)
        );
        this.designerPanel.containerScale = nextScale;
        console.log("缩放", e);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.designer-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .designer-header {
    height: 50px;
    background-color: rgb(163, 105, 105);
  }
  .designer-center {
    display: flex;
    flex: 1;
    overflow: hidden;
    .left {
      width: 270px;
      background-color: #ccc;
    }
    .center {
      flex: 1;
      background-color: #eee;
      overflow: auto;
      position: relative;
      .container {
        position: absolute;
        width: 5000px;
        height: 3000px;
        .designer {
          position: absolute;
          background-color: #fff;
          flex-shrink: 0;
          top: 20px;
          left: 20px;
          .com-item {
            position: absolute;
          }
        }
      }
    }
    .right {
      width: 270px;
      background-color: yellow;
    }
  }
}
</style>