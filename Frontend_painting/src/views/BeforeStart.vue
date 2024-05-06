<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-04-10 16:49:42
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-04-17 12:25:03
-->
<!--  -->
<template>
    <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
        <div style="font-size: 16px;">
            <h1 style="margin-bottom: 20px; font-size: 35px;">设置</h1>
            <div style="margin-top: 20px; display: flex; align-items: center;">休息时长: &nbsp;&nbsp;&nbsp;
                <el-input v-model="gap_relax_time" style="width: 240px" placeholder="Please input" ><template #append>S/组</template></el-input>
            </div>

            <div style="margin-top: 20px; display: flex; align-items: center;">大组休息: &nbsp;&nbsp;&nbsp;
                <el-input v-model="relax_time" style="width: 240px" placeholder="Please input" ><template #append>S/组</template></el-input>
            </div>
            <div style="margin-top: 20px; display: flex; align-items: center;">展示时长: &nbsp;&nbsp;&nbsp;
                <el-input v-model="show_time" style="width: 240px" placeholder="Please input" ><template #append>S/张</template></el-input>
            </div>
            <!-- <div style="margin-top: 20px; display: flex; align-items: center;">每组数量: &nbsp;&nbsp;&nbsp;
                <el-input v-model="group_num" style="width: 240px" placeholder="Please input" >
                
                    <template #append>张/组</template></el-input>
            </div>
                    <div>共{{ fig_num }}张图片，{{ Math.round(fig_num / group_num) }}组</div> -->
            <div style="margin-top: 50px;">
                <el-button @click="jumpTo()">开始实验</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import fig_info from '/public/fig_info.json'
import { useDataStore } from "@/stores/counter";

export default {
    data() {
        return {
            relax_time: 30,
            show_time: 2,
            gap_relax_time: 10,
            group_num: 10,
            fig_num: 0
        };
    },

    components: {},

    computed: {},

    mounted() {
        // console.log(fig_info);
        // this.fig_num = fig_info.fig_info.length;
    },

    methods: {
        jumpTo() {

            const dataStore = useDataStore();
            dataStore.setting = {
                group_num: this.group_num,
                relax_time: this.relax_time,
                show_time: this.show_time,
                gap_relax_time: this.gap_relax_time
            }
            
            this.$router.push('/test');
            
            // axios.post('https://formspree.io/f/xrgnoavv', {
            //     data: {
            //         name: "test"
            //     },
            //     dataType: 'json'
            // }).then((res) => {
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // })

            
        }
    }
}
</script>

<style lang='scss' scoped>

</style>