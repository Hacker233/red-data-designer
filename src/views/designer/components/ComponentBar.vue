<template>
  <el-row class="bar">
    <el-row class="topTab-box">
      <el-col :class="currentTab === 1 ? 'focusTab' : ''" class="topTab">
        <div class="title" @click="currentTab = 0">组件</div>
      </el-col>
      <el-col :class="currentTab === 0 ? 'focusTab' : ''" class="topTab">
        <div class="title" @click="currentTab = 1">图层</div>
      </el-col>
    </el-row>

    <!-- 组件盒子列表 -->
    <div class="com-list">
      <el-collapse
        v-model="activeNames"
        v-show="currentTab === 0"
        v-for="group in cptGroupKeys"
        :key="group.key"
      >
        <el-collapse-item :title="group.name" :name="group.key">
          <!-- 组件列表 -->
          <el-row :gutter="2" v-show="group.opened">
            <el-col
              v-for="(item, index) in cptGroups[group.key]"
              :key="item.title + 'c' + index"
            >
              <div
                draggable="true"
                :config="JSON.stringify(item)"
                @dragstart="dragStart"
                class="chart-box"
              >
                <div class="img-icon">
                  <i :class="item.icon ? item.icon : 'el-icon-question'"></i>
                </div>
                <div style="font-size: 13px">{{ item.title }}</div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-show="currentTab === 1">
      <div
        v-show="selectedComponents.length === 0"
        style="text-align: center; line-height: 50px"
      >
        无图层
      </div>
      <el-row
        v-for="(item, index) in selectedComponents"
        :key="item.keyId"
        class="selectedItem"
        :style="{
          background: currentCptIndex === index ? '#3F4B5F' : '#353f50',
        }"
      >
        <el-col :span="4" style="text-align: center"
          ><i :class="item.icon"
        /></el-col>
        <el-col :span="15" @click.native="showConfigBar(item, index)">{{
          item.cptTitle
        }}</el-col>
        <el-col :span="5" style="text-align: center">
          <i class="el-icon-copy-document" @click="copyCpt(item)" />
          <i
            style="margin-left: 4px"
            class="el-icon-delete"
            @click="delCpt(item, index)"
          />
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>

<script>
import cptGroups from "@/components/registerCpt";
import cptOptions from "@/components/options"; //重复引入待优化

export default {
  name: "componentBar",
  data() {
    return {
      cptGroups,
      cptOptions,
      cptGroupKeys: [],
      currentTab: 0, //0组件，1图层
      activeNames: "",
    };
  },
  props: {
    selectedComponents: Array,
    currentCptIndex: Number,
  },
  created() {
    for (let key in cptGroups) {
      this.cptGroupKeys.push({
        key: key,
        name: cptOptions[key].name,
        icon: cptOptions[key].icon,
        opened: cptOptions[key].opened,
      });
    }
  },
  methods: {
    dragStart(e) {
      let copyDom = e.currentTarget.cloneNode(true);
      this.$emit("dragStart", copyDom);
    },
    showConfigBar(item, index) {
      this.$emit("showConfigBar", item, index);
    },
    copyCpt(item) {
      this.$emit("copyCpt", item);
    },
    delCpt(item, index) {
      this.$emit("delCpt", item, index);
    },
  },
};
</script>

<style lang="less" scoped>
.bar {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #1e2427;
  color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  .com-list {
    /deep/ .el-collapse {
      border: none;
    }
    // 外层包裹
    /deep/ .el-collapse-item__wrap {
      background-color: #1e2427;
      border: none;
    }
    // 头部
    /deep/ .el-collapse-item__header {
      background-color: #2b3340;
      color: #fff;
      border: none;
      padding: 0 10px;
    }
    // 选项
    /deep/ .el-collapse-item__content {
      padding: 0;
    }
    .tab-title {
      line-height: 45px;
      cursor: pointer;
      box-shadow: 0 1px 2px #2b3340;
    }
    .chart-box {
      background-color: #3f4b5f;
      height: 70px;
      display: flex;
      align-items: center;
      margin-top: 2px;
      cursor: pointer;
      color: #fff;
      transition: all 0.3s;
      .img-icon {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        i {
          font-size: 30px;
        }
      }
      &:hover {
        background-color: #61718d;
        cursor: move;
      }
    }
  }
}
.topTab-box {
  width: 180px;
  height: 35px;
  display: flex;
  cursor: pointer;
  position: sticky;
  top: 0;
  z-index: 7;
  background: #353f50;
  box-shadow: 0 1px 3px #2b3340;
  .topTab {
    width: 100%;
    height: 100%;
    font-size: 14px;
    .title {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.focusTab {
  background: #3f4b5f;
}
.selectedItem {
  line-height: 45px;
  cursor: pointer;
  box-shadow: 0 1px 3px #2b3340 inset;
}
</style>
