<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-05-08 20:18:45
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-05-20 16:17:20
-->
<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2024-05-06 23:01:35
-->
<template>
    <div class="common-layout" :style="{width: '100%', height: '100vh', backgroundColor: (isGap) ? ' #797775' : 'white' }" v-loading="!initSign" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- <Main :msgH="msgH"/> -->
        <!-- @click.right="nextRoundClick()" -->
    
        <div style="height: 100%; width: 100%;">
            <!-- <test v-if="!isRelax" :pattern="pattern[patternCnt]" :startTime="startTime"></test> -->
            <div v-show="!isGap" class="fullscreen-img">
                <!-- <div style="font-size: 50px; color: red;">{{ figCnt }}</div> -->
                <img ref="myImage" :src="imgURL" alt="" :class="{
                            
                                            }">
            </div>
            <div v-show="isGap" style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column; padding-top: calc(0vh);">
                <div style="margin-bottom: 30px; font-size: 20px; color: white;">休息 {{ (timeNote) }} 秒</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useDataStore } from "@/stores/counter";
import fig_info from '/public/data_description.json'

export default {
    name: "home_view",
    data() {
        return {
            msgH: null,
            figCnt: -1,

            allData: [],

            timeNote: 0,
            imgURL: '',
            typeGroup: ['a-b', 'l-a', 'l-b'],
            isGap: false,
            fig_res_data: [],

            intervalID: null,
            timeoutID: null
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
        const dataStore = useDataStore();
        this.allData = fig_info.data
        this.fig_res_data = this.calcPic(this.allData);
        this.startInterval();
    },
    beforeDestroy() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
    },
    methods: {
        calcPic(fig_data) {
            this.imgURL = ''
            this.isPic = true;
            let res_data = new Array();
            for (let index in fig_data) {
                let file_name = fig_data[index].name;
                for (let type_name of this.typeGroup) {
                    for (let fig_name in fig_data[index][type_name].fig_info) {
                        let url = file_name + '/' + fig_data[index][type_name].fig_info[fig_name];
                        res_data.push(url);
                    }
                }
            }
            res_data = this.shuffleArray(res_data);
            this.saveData(res_data);
            return res_data;
        },
        saveData(res_data) {
            const dataStore = useDataStore();
            let data = {
                info: dataStore.info,
                data: res_data
            };
            // axios.post('https://formspree.io/f/xrgnoavv', {
            axios.post('https://formspree.io/f/xqkrgypr', {
                data: JSON.stringify(data),
                dataType: 'json'
            }).then((res) => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            // this.$router.push('/end');
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        executeFunction() {
            this.isGap = !this.isGap
            this.figCnt += 1;
            if (this.figCnt >= this.fig_res_data.length) {
                this.$router.push('/beforeTest2');
            }
            let path = this.fig_res_data[this.figCnt];
            this.imgURL = 'painting/' + path;
            this.timeoutID = setTimeout(() => {
                this.startInterval();
            }, 15000)
        },
        startInterval() {
            if (this.intervalID) {
                clearInterval(this.intervalID);
            }
            if (this.timeoutID) {
                clearTimeout(this.timeoutID);
            }
            this.isGap = !this.isGap

            let timeCount = 10;
            this.timeNote = timeCount;
            this.intervalID = setInterval(() => {
                if (timeCount > 0) {
                    timeCount -= 1;
                    this.timeNote = timeCount;
                } else {
                    clearInterval(this.intervalID)
                    this.executeFunction();
                }
            }, 1000);
        }
    },
    watch: {},
    components: {}
};
</script>

<style scoped>
.fullscreen-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* text-align: center; */
    display: flex;
    justify-content: center;
}

.fullscreen-img .vertical {
    height: 100%;
    width: auto;
    display: block;
}

.fullscreen-img .horizontal {
    height: auto;
    width: 100%;
    display: block;
}

.boundary {
    /*border-style: dashed;*/
    border-style: solid;
    border-color: #d3dce6;
    border-width: 0.5px;
    border-radius: 3px;
}

.cross {
    position: relative;
    width: 50px;
    /* 设置十字的宽度 */
    height: 50px;
    /* 设置十字的高度 */
}

.cross::before,
.cross::after {
    content: '';
    position: absolute;
    background-color: #ffffff;
    /* 设置十字的颜色 */
}

.cross::before {
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    /* 设置水平线的高度 */
    transform: translateY(-50%);
}

.cross::after {
    left: 50%;
    top: 0;
    width: 5px;
    /* 设置垂直线的宽度 */
    height: 100%;
    transform: translateX(-50%);
}
</style>
