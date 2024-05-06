<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2024-04-17 12:23:32
-->
<template>
    <div class="common-layout" :style="{width: '100%', height: '100vh', backgroundColor: (isRelax || isGap) ? ' #797775' : 'white' }" v-loading="!initSign" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- <Main :msgH="msgH"/> -->
        <!-- @click.right="nextRoundClick()" -->
    
        <div style="height: 100%; width: 100%;">
            <!-- <test v-if="!isRelax" :pattern="pattern[patternCnt]" :startTime="startTime"></test> -->
            <div v-if="!isRelax && !isGap" class="fullscreen-img">
                <!-- <div style="font-size: 50px; color: red;">{{ figCnt }}</div> -->
                <img ref="myImage" :src="imgURL" alt="" :class="{
                    
                                    }">
            </div>
            <div v-else-if="isRelax" style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column; padding-top: calc(0vh);">
                <div style="margin-bottom: 10px; font-size: 40px; color: white;">第 {{ (fileCnt + 1) }} 轮</div>
    
                <div style="margin-bottom: 30px; font-size: 20px; color: white;">休息 {{ (timeNote) }} 秒</div>
            </div>
            <div v-else-if="isGap" style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column; padding-top: calc(0vh);">
                <!-- <div style="margin-bottom: 10px; font-size: 40px; color: white;">第 {{ (fileCnt + 1) }} - {{ (typeCnt + 1) }} 轮</div> -->
    
                <div style="margin-bottom: 30px; font-size: 20px; color: white;">休息 {{ (timeNote) }} 秒</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { saveData } from '../service/module/dataService';
import { useDataStore } from "@/stores/counter";
import fig_info from '/public/data_description.json'

export default {
    name: "home_view",
    data() {
        return {
            msgH: null,
            pattern: [],
            patternCnt: 0,

            fileCnt: -1,
            typeCnt: 0,
            figCnt: 0,

            allData: [],

            timeCnt: 0,
            gapCnt: 0,
            figShowCnt: 0,

            timeNote: 0,
            isRelax: false,
            timer: null,
            imgURL: '',
            typeGroup: ['a-b', 'l-a', 'l-b'],
            isGap: false
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
        this.timeCnt = dataStore.setting.relax_time;
        this.gapCnt = dataStore.setting.gap_relax_time;
        this.figShowCnt = dataStore.setting.show_time;
        this.patternCnt = 0;
        this.allData = fig_info.data
        // this.calcPic(this.allData);
        this.timeCountDown();
    },
    methods: {
        calcPic(fig_data) {
            let fileCnt = this.fileCnt;
            let typeCnt = this.typeCnt;
            let file_name = fig_data[fileCnt].name;
            let file_type = this.typeGroup[typeCnt];
            let figCnt = 0;
            let random_index = Math.floor(Math.random() * 10);
            console.log(random_index)
            this.imgURL = '/output/' + file_name + '/' + fig_data[fileCnt][file_type].fig_info[(figCnt + random_index) % 10];
            this.figCnt = (figCnt + random_index) % 10;
            let figTimer = setInterval(() => {

                this.imgURL = '/output/' + file_name + '/' + fig_data[fileCnt][file_type].fig_info[(figCnt + random_index) % 10];
                figCnt += 1;
                console.log(random_index, figCnt, (figCnt + random_index) % 10)
                this.figCnt = (figCnt + random_index) % 10;
                if (figCnt == fig_data[fileCnt][file_type].fig_info.length + 1) {
                    if (typeCnt == 2) {
                        if (fileCnt == this.allData.length - 1) {
                            clearInterval(figTimer);
                            this.$router.push('/end');
                        }
                    }
                }
                if (figCnt == fig_data[fileCnt][file_type].fig_info.length + 1) {
                    // this.isGap = true;
                    // console.log(this.isGap)
                    if (typeCnt == this.typeGroup.length - 1) {
                        this.timeCountDown();
                        clearInterval(figTimer);
                    } else {
                        this.gapCountDown()
                        clearInterval(figTimer);
                    }
                }
            }, this.figShowCnt * 1000)
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        timeCountDown() {
            this.isRelax = !this.isRelax;
            let timeCount = this.timeCnt;
            this.timeNote = timeCount;
            this.fileCnt += 1;
            this.typeCnt = 0;
            this.timer = setInterval(() => {
                if (timeCount > 0) {
                    timeCount--;
                    this.timeNote = timeCount;
                } else {
                    clearInterval(this.timer);
                    this.startTest();
                }
            }, 1000);
        },
        gapCountDown() {
            this.isGap = !this.isGap;
            let timeCount = this.gapCnt;
            this.timeNote = timeCount;
            this.timer = setInterval(() => {
                if (timeCount > 0) {
                    timeCount--;
                    this.timeNote = timeCount;
                } else {
                    clearInterval(this.timer);
                    this.typeCnt += 1;
                    this.startGap();
                }
            }, 1000);
        },
        skipRelax() {
            clearInterval(this.timer);
            this.startTest();
        },
        startTest() {
            this.isRelax = false;
            this.calcPic(this.allData);
        },
        startGap() {
            this.isGap = false;
            this.calcPic(this.allData);
        },
    },
    watch: {
        isRelax: {
            handler() {
                // if (this.isRelax) {
                //     this.calcPic(this.allData);
                // }
            }
        }
    },
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
