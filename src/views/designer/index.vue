<template>
  <div class="index-box">
    <!-- 顶部菜单 -->
    <top-header @saveImg="saveImg" @clearDesign="clearDesign" @preview="preview" @submitDesign="submitDesign"></top-header>
    <!-- 绘制区域 -->
    <div
      :style="{
        height: windowHeight - 35 + 'px',
      }"
      class="bottom"
      @click.self="outBlur"
    >
      <!-- 左侧组件区域 -->
      <div class="bottom-left" :style="{ width: cptBarWidth + 'px' }">
        <!--左侧组件栏-->
        <component-bar
          @dragStart="dragStart"
          :selectedComponents="cacheComponents"
          :currentCptIndex="currentCptIndex"
          @showConfigBar="showConfigBar"
          @copyCpt="copyCpt"
          @delCpt="delCpt"
        />
      </div>
      <!-- 中间绘制区域 -->
      <div class="bottom-center" id="wrapper" @click.self="outBlur">
        <SketchRule
          :lang="lang"
          :thick="thick"
          :scale="containerScale"
          :width="width"
          :height="height"
          :startX="startX"
          :startY="startY"
          :shadow="shadow"
          :palette="palette"
          :horLineArr="lines.h"
          :verLineArr="lines.v"
          :isShowReferLine="isShowReferLine"
          :cornerActive="true"
          @handleLine="handleLine"
          @onCornerClick="handleCornerClick"
        >
        </SketchRule>
        <div
          ref="screensRef"
          id="screens"
          @wheel="handleWheel"
          @scroll="handleScroll"
        >
          <div ref="containerRef" class="screen-container">
            <!-- <div id="canvas" :style="canvasStyle" /> -->
            <div class="bottom-center-box">
              <div
                id="canvas"
                class="webContainer"
                :style="{
                  width: '1920px',
                  height: (1920 / designData.scaleX) * designData.scaleY + 'px',
                  backgroundColor: designData.bgColor,
                  backgroundImage: designData.bgImg
                    ? 'url(' + fileUrl + '/file/img/' + designData.bgImg + ')'
                    : 'url(../assets/img/draw-bg.png)',
                  transform: 'scale(' + containerScale + ')',
                }"
                @dragover="allowDrop"
                @drop="drop"
                ref="webContainer"
                @click.self="outBlur"
              >
                <!-- 循环组件 -->
                <div
                  v-for="(item, index) in cacheComponents"
                  :key="item.keyId"
                  class="cptDiv"
                  :style="{
                    width: Math.round(item.cptWidth) + 'px',
                    height: Math.round(item.cptHeight) + 'px',
                    top: Math.round(item.cptY) + 'px',
                    left: Math.round(item.cptX) + 'px',
                    zIndex: currentCptIndex === index ? 1800 : item.cptZ,
                  }"
                  @mousedown="showConfigBar(item, index)"
                >
                  <!--顶部辅助线-->
                  <div
                    v-show="currentCptIndex === index"
                    class="top-guides"
                  ></div>
                  <!--左侧辅助线-->
                  <div
                    v-show="currentCptIndex === index"
                    class="bottom-guides"
                  ></div>

                  <!-- 移动区域 -->
                  <div
                    v-resize="'move'"
                    class="activeMask"
                    :style="
                      currentCptIndex === index
                        ? { border: '1px solid #B6BFCE' }
                        : {}
                    "
                  >
                    <!-- 具体某一个组件 -->
                    <div style="width: 100%; height: 100%">
                      <comment
                        :is="item.cptName"
                        :ref="item.cptName + index"
                        :width="Math.round(item.cptWidth)"
                        :height="Math.round(item.cptHeight)"
                        :option="item.option"
                      />
                    </div>
                  </div>
                  <!-- 组件右上角复制和删除按钮 -->
                  <div class="delTag">
                    <i
                      class="el-icon-copy-document"
                      @click.stop="copyCpt(item)"
                    />
                    <i
                      style="margin-left: 4px"
                      class="el-icon-delete"
                      @click.stop="delCpt(item, index)"
                    />
                  </div>

                  <!-- 组件边框上的8个拖拽点 -->
                  <div
                    v-show="currentCptIndex === index"
                    style="top: -3px; left: -3px; cursor: se-resize"
                    class="resizeTag"
                    v-resize="'lt'"
                  />
                  <div
                    v-show="currentCptIndex === index"
                    style="top: -3px; left: 48%; cursor: s-resize"
                    class="resizeTag"
                    v-resize="'t'"
                  />
                  <div
                    v-show="currentCptIndex === index"
                    style="top: -3px; right: -4px; cursor: ne-resize"
                    class="resizeTag"
                    v-resize="'rt'"
                  />
                  <div
                    v-show="currentCptIndex === index"
                    style="top: 48%; right: -4px; cursor: w-resize"
                    class="resizeTag"
                    v-resize="'r'"
                  />
                  <div
                    v-show="currentCptIndex === index"
                    style="bottom: -4px; right: -4px; cursor: se-resize"
                    class="resizeTag"
                    v-resize="'rb'"
                  />
                  <div
                    v-show="currentCptIndex === index"
                    style="bottom: -4px; left: 48%; cursor: s-resize"
                    class="resizeTag"
                    v-resize="'b'"
                  />
                  <div
                    v-show="currentCptIndex === index"
                    style="bottom: -4px; left: -3px; cursor: ne-resize"
                    class="resizeTag"
                    v-resize="'lb'"
                  />
                  <div
                    v-show="currentCptIndex === index"
                    style="top: 48%; left: -3px; cursor: w-resize"
                    class="resizeTag"
                    v-resize="'l'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧属性面板 -->
      <div class="bottom-right">
        <!-- 标题栏 -->
        <div class="config-bar-title">
          <p>操作</p>
        </div>
        <!--组件属性设置面板-->
        <config-bar
          v-show="!isShowScreen"
          ref="configBar"
          @change="changeCpt"
          :currentCpt="currentCpt"
          @refreshCptData="refreshCptData"
        />
        <!-- 大屏设置面板-参考sitting-form -->
        <screen-setting
          v-show="isShowScreen"
          :formData="designData"
          @saveSittingForm="saveSittingForm"
          @cancel="cancelSittingForm"
          @updateScale="initContainerSize"
        ></screen-setting>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader.vue"; // 顶部设置栏
import ComponentBar from "./components/ComponentBar.vue"; // 左侧组件栏
import ConfigBar from "./components/ConfigBar.vue"; // 右侧属性设置栏
import cptOptions from "@/components/options";
import html2canvas from "html2canvas";
import env from "/env";
import { clearCptInterval } from "@/utils/refreshCptData";

import SketchRule from "../../components/RulerScale/sketchRuler.vue";
import ScreenSetting from "./components/ScreenSetting.vue";
export default {
  name: "design-index",
  components: {
    TopHeader,
    ConfigBar,
    ComponentBar,
    SketchRule,
    ScreenSetting,
  },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      fileUrl: env.fileUrl,
      cptBarWidth: 180, // 图表列表宽度
      configWidth: 315, // 属性栏宽度
      conWidth: 0,
      conHeight: 0,
      copyDom: "",
      designData: {
        id: "",
        title: "我的大屏",
        scaleX: 16,
        scaleY: 9,
        version: "",
        bgColor: "#2B3340",
      },
      oldDesignData: "", //大屏参数表单未保存时还原
      cacheComponents: [], // 缓存组件
      currentCptIndex: -1,
      currentCpt: { option: undefined },
      containerScale: 1, // 缩放比例
      isShowScreen: true, // 是否显示大屏设置面板

      // 参考线相关参数
      // scale: 1, //658813476562495, //1,
      startX: 0,
      startY: 0,
      lines: {
        h: [0, 0],
        v: [0, 0],
      },
      width: 5000,
      height: 3000,
      thick: 20,
      lang: "zh-CN", // 中英文
      isShowRuler: true, // 显示标尺
      isShowReferLine: true, // 显示参考线
      palette: {
        bgColor: "#1e2427",
        longfgColor: "#BABBBC",
        shortfgColor: "#C8CDD0",
        fontColor: "#fff",
        shadowColor: "#E8E8E8",
        lineColor: "#EB5648",
        borderColor: "#DADADC",
        cornerActiveColor: "rgb(235, 86, 72, 0.6)",
      },
    };
  },
  computed: {
    shadow() {
      return {
        x: 0,
        y: 0,
      };
    },
    canvasStyle() {
      return {
        width: rectWidth + "px",
        height: rectHeight + "px",
        transform: `scale(${this.containerScale})`,
      };
    },
  },
  created() {
    this.loadCacheData();
  },
  mounted() {
    // 滚动居中-参考线
    this.$refs.screensRef.scrollLeft =
      this.$refs.containerRef.getBoundingClientRect().width / 2 - 100; // 300 = #screens.width / 2
    this.$nextTick(() => {
      this.initSize();
    });
    const that = this;
    window.addEventListener("keydown", (event) => {
      if (that.currentCptIndex !== -1) {
        let key = event.key;
        switch (
          key //方向键移动当前组件
        ) {
          case "ArrowDown":
            that.currentCpt.cptY += 1;
            break;
          case "ArrowUp":
            that.currentCpt.cptY -= 1;
            break;
          case "ArrowLeft":
            that.currentCpt.cptX -= 1;
            break;
          case "ArrowRight":
            that.currentCpt.cptX += 1;
            break;
        }
      }
    });
    window.onresize = () => {
      return (() => {
        that.initContainerSize();
      })();
    };
  },
  methods: {
    handleLine(lines) {
      // console.log("lines",lines)
      this.lines = lines;
    },
    handleCornerClick() {
      this.isShowReferLine = !this.isShowReferLine;
      return;
    },
    // 绘制区域滚动
    handleScroll() {
      const screensRect = document
        .querySelector("#screens")
        .getBoundingClientRect();
      const canvasRect = document
        .querySelector("#canvas")
        .getBoundingClientRect();
      // 标尺开始的刻度
      const startX =
        (screensRect.left + this.thick - canvasRect.left) / this.containerScale;
      const startY =
        (screensRect.top + this.thick - canvasRect.top) / this.containerScale;
      this.startX = startX >> 0;
      this.startY = startY >> 0;
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(0.2, this.containerScale - e.deltaY / 500).toFixed(2)
        );
        this.containerScale = nextScale;
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    initSize() {
      const wrapperRect = document
        .querySelector("#wrapper")
        .getBoundingClientRect();
      const borderWidth = 1;
      this.width = wrapperRect.width - this.thick - borderWidth;
      this.height = wrapperRect.height - this.thick - borderWidth;
    },
    initContainerSize() {
      this.windowWidth = document.documentElement.clientWidth; // 浏览器可视区域宽度
      this.windowHeight = document.documentElement.clientHeight; // 浏览器可视区域高度
      let tempWidth =
        this.windowWidth - this.cptBarWidth - this.configWidth - 40; // 绘制区域宽度
      let tempHeight =
        (tempWidth / this.designData.scaleX) * this.designData.scaleY; // 绘制区域高度
      const maxHeight = this.windowHeight - 35;
      if (tempHeight > maxHeight) {
        tempWidth =
          (maxHeight / this.designData.scaleY) * this.designData.scaleX;
      }
      //缩放思路：组件尺寸始终保持1920为基准，保证在每台电脑上的尺寸一致，设计实时缩放
      this.containerScale = Math.round((tempWidth / 1920) * 100) / 100; //原始比例1920
    },
    // 下载图片
    saveImg(){
      html2canvas(this.$refs.webContainer, {
          backgroundColor: "#49586e",
        }).then((canvas) => {
          const canvasData = canvas.toDataURL("image/jpeg");
          fileDownload(canvasData, this.designData.title + ".png");
        });
    },
    // 清空大屏
    clearDesign() {
      this.$confirm("此操作将会清空图层，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.cacheComponents = []; // 清楚缓存组件
          this.designData.components = [];
          this.currentCpt = undefined;
          this.isShowScreen = true; // 显示大屏设置面板
          localStorage.removeItem("designCache");
          clearCptInterval(null, true);
          this.$message.success("清除成功");
        })
        .catch(() => {});
    },
    // 加载缓存数据
    loadCacheData() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const cacheStr = localStorage.getItem("designCache");
      if (cacheStr) {
        this.designData = JSON.parse(cacheStr);
        if (
          !this.designData.version ||
          this.designData.version !== env.version
        ) {
          localStorage.removeItem("designCache");
          this.$message.success("发现旧版缓存，已清除");
        } else {
          this.cacheComponents = this.designData.components;
          this.designData.components = []; //强迫症
        }
      }
      this.designData.version = env.version;
      this.initContainerSize();
      loading.close();
    },
    copyCpt(item) {
      let copyItem = JSON.parse(JSON.stringify(item));
      copyItem.cptX = item.cptX + 30; //复制的组件向右下偏移
      copyItem.cptY = item.cptY + 30;
      copyItem.keyId = require("uuid").v1();
      this.cacheComponents.push(copyItem);
      this.currentCptIndex = this.cacheComponents.length - 1; //聚焦到复制的组件
    },
    refreshCptData() {
      const refName = this.currentCpt.cptName + this.currentCptIndex;
      if (!this.$refs[refName][0].refreshCptData) {
        this.$message.warning("当前图层还未实现refreshCptData方法");
      } else {
        this.$refs[refName][0].refreshCptData(); //刷新子组件数据，refs为组建名加index
      }
    },
    outBlur() {
      //取消聚焦组件
      this.currentCptIndex = -1;
      this.currentCpt = undefined;
      this.isShowScreen = true;
    },
    submitDesign() {
      //保存
      if ("preview" === env.active) {
        this.designData.components = this.cacheComponents;
        localStorage.setItem("designCache", JSON.stringify(this.designData));
        this.$message.success("已保存");
      } else {
        const that = this;
        if (!that.$route.query.id) {
          that.$message.error("更新异常");
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: "保存中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        html2canvas(that.$refs.webContainer, {
          backgroundColor: "#49586e",
        }).then((canvas) => {
          const canvasData = canvas.toDataURL("image/jpeg");
          let file = base64toFile(canvasData, that.designData.title + ".png");
          let fileFormData = new FormData();
          fileFormData.append("file", file);
          uploadFileApi(that.designData.designImgId, fileFormData).then(
            (res) => {
              //上传预览图
              that.designData.designImgId = res.data;
              that.designData.components = JSON.stringify(this.cacheComponents);
              saveOrUpdateApi(this.designData).then((res2) => {
                loading.close();
                that.$message.success(res2.msg);
              });
            }
          );
        });
      }
    },
    preview() {
      //预览按钮
      this.designData.components = this.cacheComponents;
      localStorage.setItem("designCache", JSON.stringify(this.designData));
      let routeUrl = this.$router.resolve({
        path: "/preview",
      });
      window.open(routeUrl.href, "_blank");
    },
    delCpt(cpt, index) {
      this.$confirm("删除" + cpt.cptTitle + "组件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //记录一个bug，v-for key值重复导致页面渲染数据错乱。在丢下组件时实用uuid作为key解决。
          this.currentCpt = undefined;
          this.isShowScreen = true; // 显示大屏设置面板
          this.cacheComponents.splice(index, 1);
          const childId = this.$refs[cpt.cptName + index][0].uuid;
          clearCptInterval(childId);
        })
        .catch(() => {});
    },
    changeCpt(position) {
      console.log("修改参数", position);
      //基础属性修改
      position.cptName = this.cacheComponents[this.currentCptIndex].cptName;
      position.option = this.cacheComponents[this.currentCptIndex].option; //这俩句突然搞忘了为啥存在，空了再来看看
      this.cacheComponents[this.currentCptIndex] = position;
      this.cacheComponents.splice(0, 1, this.cacheComponents[0]);
    },
    showConfigBar(item, index) {
      //刷新属性栏数据，页面上拖动的组件执行click事件来更新组件的属性栏
      this.currentCpt = item;
      this.isShowScreen = false; // 显示大屏设置面板
      this.currentCptIndex = index;
      let currentCptPosition = {
        groupTag: item.groupTag,
        cptTitle: item.cptTitle,
        icon: item.icon,
        cptWidth: item.cptWidth,
        cptHeight: item.cptHeight,
        cptX: item.cptX,
        cptY: item.cptY,
        cptZ: item.cptZ,
      };
      // 刷新属性菜单数据
      this.$refs["configBar"].updateData(currentCptPosition);
    },
    // 拿起组件
    dragStart(copyDom) {
      this.copyDom = copyDom;
      copyDom.draggable = false;
    },
    // 保存大屏设置
    saveSittingForm(formData) {
      this.designData = formData;
      this.submitDesign();
    },
    // 设置表单关闭
    cancelSittingForm() {
      this.designData = JSON.parse(this.oldDesignData);
      this.initContainerSize(); //待优化
    },
    allowDrop(e) {
      e.preventDefault();
    },
    // 放下组件
    drop(e) {
      console.log("放下", e);
      let config = JSON.parse(this.copyDom.getAttribute("config"));
      let cpt = {
        groupTag: config.group,
        cptTitle: config.title,
        icon: config.icon,
        cptName: config.name,
        cptZ: 1,
        option: undefined,
        cptX: Math.round(e.offsetX),
        cptY: Math.round(e.offsetY),
        cptWidth: config.initWidth,
        cptHeight: config.initHeight,
        keyId: require("uuid").v1(),
      };
      const group = cptOptions[config.group];
      if (group && group.options[config.name + "-option"]) {
        const option = group.options[config.name + "-option"];
        cpt.option = JSON.parse(JSON.stringify(option));
      } else {
        this.$message.error(
          "未再options.js中查找到" +
            config.group +
            "." +
            config.name +
            "-option的自定义属性"
        );
        return;
      }
      this.cacheComponents.push(cpt);
      this.showConfigBar(cpt, this.cacheComponents.length - 1); //丢下组件后刷新组件属性栏
      this.$refs["configBar"].showConfigBar();
    },
  },
  // 自定义指令
  directives: {
    resize(el, binding, vNode) {
      //组件拉伸，移动位置
      const that = vNode.context;
      el.onmousedown = function (e) {
        const scaleClientX = e.clientX / that.containerScale;
        const scaleClientY = e.clientY / that.containerScale;
        const rbX = scaleClientX - el.parentNode.offsetWidth;
        const rbY = scaleClientY - el.parentNode.offsetHeight;
        const ltX = scaleClientX + el.parentNode.offsetWidth;
        const ltY = scaleClientY + el.parentNode.offsetHeight;
        const disX = scaleClientX - el.parentNode.offsetLeft;
        const disY = scaleClientY - el.parentNode.offsetTop;
        let cptWidth, cptHeight, cptX, cptY;
        document.onmousemove = function (me) {
          const meScaleClientX = me.clientX / that.containerScale;
          const meScaleClientY = me.clientY / that.containerScale;
          // 选中组件
          if (binding.value === "move") {
            cptX = meScaleClientX - disX;
            cptY = meScaleClientY - disY;
            el.parentNode.style.left = cptX + "px";
            el.parentNode.style.top = cptY + "px";
          } else {
            switch (binding.value) {
              case "lt":
                cptWidth = ltX - meScaleClientX;
                cptHeight = ltY - meScaleClientY;
                cptX = meScaleClientX - disX;
                cptY = meScaleClientY - disY;
                el.parentNode.style.left = cptX + "px";
                el.parentNode.style.top = cptY + "px";
                break;
              case "t":
                cptHeight = ltY - meScaleClientY;
                cptY = meScaleClientY - disY;
                el.parentNode.style.top = cptY + "px";
                break;
              case "rt":
                cptWidth = meScaleClientX - rbX;
                cptHeight = ltY - meScaleClientY;
                cptY = meScaleClientY - disY;
                el.parentNode.style.top = cptY + "px";
                break;
              case "r":
                cptWidth = meScaleClientX - rbX;
                break;
              case "rb":
                cptWidth = meScaleClientX - rbX;
                cptHeight = meScaleClientY - rbY;
                break;
              case "b":
                cptHeight = meScaleClientY - rbY;
                break;
              case "lb":
                cptWidth = ltX - meScaleClientX;
                cptHeight = meScaleClientY - rbY;
                cptX = meScaleClientX - disX;
                el.parentNode.style.left = cptX + "px";
                break;
              case "l":
                cptWidth = ltX - meScaleClientX;
                cptX = meScaleClientX - disX;
                el.parentNode.style.left = cptX + "px";
                break;
            }
            cptWidth = cptWidth < 40 ? 40 : cptWidth; //限制最小缩放
            cptHeight = cptHeight < 20 ? 20 : cptHeight;
            el.parentNode.style.width = cptWidth + "px";
            el.parentNode.style.height = cptHeight + "px";
          }
        };
        // 放开鼠标，更新数据
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
          //拉伸适应不同屏幕，在容器显示时会重新*缩放比例
          if (cptWidth) that.currentCpt.cptWidth = Math.round(cptWidth);
          if (cptHeight) that.currentCpt.cptHeight = Math.round(cptHeight);
          if (cptX) that.currentCpt.cptX = Math.round(cptX);
          if (cptY) that.currentCpt.cptY = Math.round(cptY);

          console.log("当前位置", that.currentCpt.cptX, that.currentCpt.cptY);
          if (that.currentCpt.cptX <= 0) {
            that.currentCpt.cptX = 0;
          }
          if (that.currentCpt.cptY <= 0) {
            that.currentCpt.cptY = 0;
          }
          console.log("更新后的数据", that.currentCpt);
          that.$refs["configBar"].updateData(that.currentCpt); // 更新数据
        };
        return false;
      };
    },
  },
};
</script>

<style lang="less" scoped>
.index-box {
  display: flex;
  flex-direction: column;
  .bottom {
    display: flex;
    background: url(../../assets/img/dot.png) repeat;

    .bottom-center {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: auto;
      .bottom-center-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        // height: 5000px;
        .webContainer {
          position: relative;
        }
      }
    }
    .bottom-right {
      width: 300px;
      background-color: #1e2427;
      overflow: auto;
      position: relative;
      .config-bar-title {
        height: 35px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #27343e;
        position: sticky;
        top: 0;
        z-index: 3;
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          letter-spacing: 2px;
          background-color: #2d343c;
          color: #fff;
        }
      }
    }
  }
}

.delTag {
  width: 45px;
  height: 22px;
  background: rgba(43, 51, 64, 0.8);
  border-radius: 2px;
  color: #ccc;
  z-index: 2000;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  display: none;
  cursor: pointer;
}
.activeMask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1801;
}
.cptDiv {
  position: absolute;
  .top-guides {
    position: fixed;
    border-top: 1px dashed #8a8a8a;
    width: 100%;
    left: 0;
  }
  .bottom-guides {
    position: fixed;
    border-right: 1px dashed #8a8a8a;
    height: 100%;
    top: 0;
  }
}
.cptDiv:hover .delTag {
  display: block;
}
.resizeTag {
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: #09f;
  z-index: 2000;
  border-radius: 50%;
}

// 参考线样式
.wrapper {
  background: url(../../assets/img/dot.png) repeat;
  position: absolute;
  width: 100%;
  height: 100%;
}
#screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.screen-container {
  position: absolute;
  width: 5000px;
  height: 3000px;
}
#canvas {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -80px;
  width: 160px;
  height: 200px;
  background: lightblue;
  // transform-origin: 50% 0;
  transform: translate(-50%, 0);
}
</style>
