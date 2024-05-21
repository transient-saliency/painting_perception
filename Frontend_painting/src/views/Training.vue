<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2024-05-06 22:36:21
-->
<template>
    <div class="common-layout" :style="{width: '100%', height: '100vh', backgroundColor: isRelax ? ' #797775' : '#ffffff'}" v-loading="!initSign" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
        <!-- @click.right="nextRoundClick()" -->
        <!-- <Main :msgH="msgH"/> -->
        <div style="height: 100%; width: 100%; margin-top: 0px;">
            <train v-if="!isRelax" :pattern="pattern[patternCnt]"></train>
            <div v-else style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column; padding-top: calc(0vh);">
                <div style="margin-bottom: 10px; font-size: 40px; color: white;">第 {{ (patternCnt + 1) }} 轮</div>
    
                <div style="margin-bottom: 30px; font-size: 20px; color: white;">休息 {{ (timeNote) }} 秒</div>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <!-- <div class="cross"></div> -->
                </div>
            </div>
        </div>
        <div style="position: absolute; right: 10px; bottom: 20px;">
            <el-button v-if="!isRelax" @click="nextRound()" :color="'#797775'"><span v-if="patternCnt < maxCnt - 1">下一轮</span><span v-else>结束实验</span></el-button>
        </div>
    </div>
</template>

<script>
import train from '../components/train.vue';
import { useDataStore } from '../stores/counter';
import painting_info from '/public/data_description.json';
import axios from 'axios';

export default {
    name: "home_view",
    data() {
        return {
            msgH: null,
            pattern: [],
            patternCnt: 0,
            timeCnt: 0,
            timeNote: 0,
            maxCnt: -1,
            isRelax: true,
            timer: null
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
        this.patternCnt = 0;
        let info = ['a-b', 'l-a', 'l-b'];
        for (let i = 0; i < painting_info.data.length; ++i) {
            for (let j in info) {
                this.pattern.push({
                    cnt: i,
                    info: info[j]
                });
            }
        }
        // console.log(painting_info, this.pattern);
        this.pattern = this.shuffleArray(this.pattern);
        this.maxCnt = info.length * painting_info.data.length;
        this.timeCountDown();
    },
    methods: {
        roundSave() {
            const dataStore = useDataStore();
            let tmp = {
                list_1: dataStore.tmpPaintingData.list_1,
                list_2: dataStore.tmpPaintingData.list_2,
                pattern: dataStore.tmpPaintingData.pattern,
                select_id: dataStore.tmpPaintingData.select_id
            };
            dataStore.allPaintingData.push(tmp);
            dataStore.tmpPaintingData = {
                list_1: [],
                list_2: [],
                pattern: {},
                select_id: []
            };
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        nextRound() {
            this.roundSave();
            this.patternCnt++;
            if (this.patternCnt != this.maxCnt)
                this.isRelax = !this.isRelax;
            else {
                this.saveData();
            }
            this.timeCountDown();
        },
        saveData() {
            const dataStore = useDataStore();
            let data = {
                data: dataStore.allPaintingData,
                info: dataStore.info
            };
            // axios.post('https://formspree.io/f/xrgnoavv', {
            axios.post('https://formspree.io/f/xqkrgypr', {
                data: JSON.stringify(data),
                dataType: 'json',
                testType: 'test2'
            }).then((res) => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.$router.push('/end');
        },
        nextRoundClick() {
            if (!this.isRelax) {
                this.patternCnt++;
                if (this.patternCnt != this.maxCnt)
                    this.isRelax = !this.isRelax;
                this.timeCountDown();
            } else {
                this.isRelax = !this.isRelax;
                this.skipRelax();
            }
            // console.log(this.patternCnt);
            event.preventDefault();

        },
        timeCountDown() {
            let timeCount = this.timeCnt;
            this.timeNote = timeCount;
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
        skipRelax() {
            clearInterval(this.timer);
            this.startTest();
        },
        startTest() {
            this.isRelax = false;
        }
    },
    watch: {
        // patternCnt: {
        //     handler() {
        //         if (this.patternCnt == this.maxCnt) {
        //             this.$router.push('/beforeStudy')
        //         }
        //     }
        // }
    },
    components: { train }
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
