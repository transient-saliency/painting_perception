<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-02-01 19:32:17
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-04-12 17:20:02
-->
<template>
    <div style="width: 100%; height: 100%;">
        <div style="display: flex; justify-content: center; height: 100%; padding-top: calc(0vh); align-items: center;">
            <div :style="{ 'font-size': '16px', color: selectFontColor }">
                <span>TARGET: {{ targetElement }}</span>
                <hr :style="{
                        backgroundColor: selectFontColor,
                        width: '100%', 
                        height: '1px', 
                        border: 'none',
                        margin: '15px 0px'
                    }">
                <div v-for="(d, i) in selectPattern.row" :key="'row_' + i" :style="{ 'line-height': selectLineHeight }">
                    <span v-for="(nd, ni) in selectPattern.number" :key="'cnt_' + i + '_' + ni" :style="{
                                        fontWeight: selectElementGroup[i * selectPattern.number + ni] == 1 ? 'bolder' : 'normal',
                                        cursor: 'pointer',
                                    }" @click="selectElement(i * selectPattern.number + ni)">{{ data[i * selectPattern.number + ni] }}<span v-if="selectPattern.space == 1">&nbsp;</span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "@/stores/counter";
import textData from '../assets/data/data.json';
export default {
    name: "APP",
    props: ["pattern", 'startTime'],
    data() {
        return {
            lastTime: 0,
            backgroundColor: ['#FF0017', '#0091FF', '#E3E3DB', '#FF00E3', '#00A88A', '#52A23B', '#B58B00', '#93908F'],
            fontColor: ['#FFFFFF', '#FFFFFF', '#93908F', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
            lineHeight: [1.5, 2, 2.5],
            textType: [0, 1, 2], // 0 - 数字，1 - 中文，2 - 英文
            data: [],
            selectLineHeight: 0,
            selectBackgroundColor: '',
            selectPattern: {},
            selectFontColor: '',
            patternType: [{
                row: 12,
                number: 8,
                space: 1
            }, {
                row: 12,
                number: 29,
                space: 0
            }, {
                row: 12,
                number: 7,
                space: 1
            }, {
                row: 10,
                number: 25,
                space: 0
            }],
            selectElementGroup: {},
            targetElement: ''
        };
    },
    methods: {
        selectElement(id) {
            const dataStore = useDataStore();
            let clickTime = new Date();
            if (typeof this.selectElementGroup[id] == 'undefined') {
                this.selectElementGroup[id] = 1;
                let tag = this.data[id] == this.targetElement ? 1 : -1;
                dataStore.eventSeq.push({
                    tag: tag,
                    clickTime: clickTime,
                    clickItem: this.data[id],
                    targetItem: this.targetElement,
                    fromStart: clickTime - this.startTime,
                    fromLast: clickTime - this.lastTime
                });
                this.lastTime = clickTime;

                let wrong = 0;
                let right = 0;
                for (let i in this.selectElementGroup) {
                    if (this.selectElementGroup[i]) {
                        if (this.data[i] == this.targetElement) {
                            right++;
                        } else {
                            wrong++;
                        }
                    }
                }
                dataStore.tmpAccuracy = {
                    wrong: wrong,
                    right: right,
                    sumWord: this.data.length
                };
            }
            // else {
            //     this.selectElementGroup[id] = !this.selectElementGroup[id];
            // }
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        dataProcess(data) {
            let target_index = Math.floor(Math.random() * data.length);
            let targetElement = data[target_index];
            data = data.toSpliced(target_index, 1);
            let select_num = 8;
            for (let i = 0; i < select_num - 1; ++i) {
                let random_index = Math.floor(Math.random() * data.length);
                data = data.toSpliced(random_index, 1);
            }
            // console.log(data);
            data = this.shuffleArray(data);
            for (let i = 0; i < select_num; ++i) {
                let random_index = Math.floor(Math.random() * (data.length - 2 * this.selectPattern.number)) + this.selectPattern.number;
                data = data.toSpliced(random_index, 0, targetElement);
            }
            return [targetElement, data];
        }
    },
    created() {},
    mounted() {
        let data = new Array();
        let textType = this.textType[this.pattern.textType];
        
        this.selectLineHeight = this.lineHeight[this.pattern.lineHeight];
        this.selectBackgroundColor = this.backgroundColor[this.pattern.backgroundColor];
        this.selectFontColor = this.fontColor[this.pattern.backgroundColor];
        this.lastTime = this.startTime;
        data = textData[textType]
        this.selectPattern = this.patternType[textType];
        [this.targetElement, this.data] = this.dataProcess(data);
    },
    watch: {},
    components: {}
}
</script>

<style>

</style>
