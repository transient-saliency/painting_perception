<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-04-15 10:12:32
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-05-27 19:15:31
-->
<!--  -->
<template>
    <div style="height: 100%; width: 100%; display: flex; justify-content: center; padding-top: 20vh;">
        <div style="font-size: 20px;">
            <h1>用户实验</h1>
            <div style="margin-top: 20px; display: flex; align-items: center;">被试编号: &nbsp;&nbsp;&nbsp;
                <el-input v-model="code" style="width: 240px" placeholder="Please input" />
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center;">被试性别: &nbsp;&nbsp;&nbsp;
                <el-radio-group v-model="gender">
                    <el-radio :value="'man'">男</el-radio>
                    <el-radio :value="'women'">女</el-radio>
                </el-radio-group>
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center;">被试年龄: &nbsp;&nbsp;&nbsp;
                <el-input-number v-model="age" style="width: 240px" placeholder="Please input" />
            </div>
            <div style="margin-top: 50px;">
                <el-button @click="jumpTo()">开始实验</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "@/stores/counter";
export default {
    data() {
        return {
            code: "",
            age: 0,
            gender: 'man',
        };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
        jumpTo() {
            const dataStore = useDataStore();
            dataStore.info = {
                "code": this.code,
                "age": this.age,
                "gender": this.gender
            }
            this.$router.push('/beforeTest2');
        }
    },
    watch: {},
}
</script>

<style lang='scss' scoped>

</style>