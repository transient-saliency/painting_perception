<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-04-10 16:37:49
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-04-12 17:14:36
-->
<!--  -->
<template>
    <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
        <div style="font-size: 16px; width: 50%;">
            <h1 style="margin-bottom: 20px; font-size: 35px;">练习</h1>
            <div style="width: 100%; text-align: left;">Please read the following text paragraph and complete the task of finding the targets. <br> 请您阅读以下文本段落，并完成寻找目标的任务
            </div>
            <div style="width: 100%; margin-top: 20px;text-align: left;">
                There are some targets in each text paragraph. Please try to quickly and accurately find the targets and left-click on them to mark them. Successfully marked targets will be bolded. <br> 每个文本段落中均存在一些特定目标，请您尽可能快速、准确的寻找目标，并左键单击目标进行标记。被成功标记的目标会加粗显示。
            </div>
            <div style="width: 100%; margin-top: 20px;text-align: left;">
                After you have read the entire text, please click "Next Round" for a 30-second break. After 30 seconds, the next text paragraph will be presented automatically. Please repeat the above task process until you have read all the paragraphs. <br> 当您阅读完整个文本后，请单击“下一轮”按钮，进行30s休息。30s后，自动呈现下一个文本段落，请重复以上任务流程，直至阅读完所有段落。
            </div>
            <div style="margin-top: 50px;">
                <el-button @click="jumpTo()">开始练习</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import loginVue from '../components/login.vue';
export default {
    data() {
        return {};
    },

    components: { loginVue },

    computed: {},

    mounted() {},

    methods: {
        jumpTo() {
            this.$router.push('/train');
        }
    }
}
</script>

<style lang='scss' scoped>

</style>