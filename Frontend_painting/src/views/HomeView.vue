<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2024-04-10 15:48:49
-->
<template>
  <div class="common-layout" style="width: 100%; height: 100vh; padding-top: 20vh;" v-loading="!initSign" :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <div style="font-size: 60px; font-family:'Times New Roman', Times, serif;">User Study</div>
        <div style="font-style: italic; font-size: 25px; margin-top: 30px;">背景颜色 & 行高 & 文本类型</div>
        <!-- <div style="margin-top: 30px; font-size: 20px; font-style: italic; font-family: Georgia, 'Times New Roman', Times, serif;">
            Bingyuan (Bill) Wang
        </div> -->
        <div style="margin-top: 50px;">
            <el-button @click="jumpTo">开始实验</el-button>
        </div>
    <!-- <Main :msgH="msgH"/> -->
  </div>
</template>

<script>
import { useDataStore } from "../stores/counter";


export default {
  name: "home_view",
  data() {
    return {
      msgH: null,
    };
  },
  computed: {
    initSign() {
      return 1;
    },
    loadingText() {
      return "Loading"
    }
  },
  mounted() {
    this.msgH = 1;
  },
  methods: {
    jumpTo() {
        this.$router.push('/login')
    }
  },
  components: {  }
};
</script>
<style scoped>

.boundary {
        /*border-style: dashed;*/
        border-style: solid;
        border-color: #d3dce6;
        border-width: 0.5px;
        border-radius: 3px;
    }
</style>
