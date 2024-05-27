<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-02-01 19:32:17
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-05-27 22:59:10
-->
<template>
    <div style="width: 100%; height: 100%; text-align: left;">
        <div>
            <VueDraggable v-model="painting_data" :animation="150" :group="{ name: 'painting', pull: 'clone', put: false }" :sort="false" @clone="onClone" class="image-container">
                <div v-for="(item, i) in painting_data" :key="item.id" style="text-align: center; cursor: pointer;" class="default">
                    <div style="font-size: 20px;">
                        <span style="border: solid 1px none">                 
                            {{ item.id }}
                        </span>
                    </div>
                    <img :src="item.path" alt="" style="height: 85%;">
                </div>
            </VueDraggable>
            <hr style="margin-top: 20px;">
            <div style="height: 40px; font-size: 15px; display: flex; justify-content: space-between; padding: 0px 20px; margin-top: -10px; margin-bottom: 0px;">
                <span>
                    Negative
                    <span style="font-size: 30px;">&larr;</span>
                </span>
                <span style="font-size: 15px; padding-top: 10px;">
                    <span v-for="el in painting_data.length" :key="el + '_key'" :style="{ 
                        padding: '0px 20px',
                        textDecoration: selectList_1.indexOf(el - 1) != -1 ? 'underline' : 'auto'
                    }">
                        {{ el - 1 }}
                    </span>
                </span>
                <span>
                    <span style="font-size: 30px;">&rarr;</span>
                    Positive
                </span>
            </div>
            <div style="display: flex;">
                <VueDraggable v-model="list_1" :animation="150" :group="{name: 'painting', pull: true, put: elCheck(list_1)}" ghost-class="dragElement" :style="{
                                    width: '100%',
                                    height: '100%',
                                    minHeight: '100px',
                                    paddingTop: '0px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }" @add="onAdd1">
                    <div v-for="(item, i) in list_1" :key="item.id" style="width:calc(10vw - 1px); text-align: center; cursor: all-scroll;" @click="click_select_id(parseInt(item.id), 0)">
                        <div style="font-size: 20px; margin-bottom: 3px; cursor: pointer;">
                            <span :style="{
                                    border: parseInt(item.id) == select_id[0] ? 'solid 1px rgba(11, 11, 11, .3)' : 'solid 1px white',
                                    backgroundColor: parseInt(item.id) == select_id[0] ? 'rgba(11, 11, 11, .1)' : 'white',
                                    borderRadius: '5px',
                                    padding: '0px 20px'
                                }">
                                    {{ item.id }}
                                </span>
                        </div>
                        <img :src="item.path" alt="" style="width: 85%;">
                    </div>
                </VueDraggable>
    
            </div>
            <hr style="margin-top: 20px;">
            <div style="height: 40px; font-size: 15px; display: flex; justify-content: space-between; padding: 0px 20px; margin-top: -10px; margin-bottom: 0px;">
                <span>
                    Dislike
                    <span style="font-size: 30px;">&larr;</span>
                </span>
                <span style="font-size: 15px; padding-top: 10px;">
                    <span v-for="el in painting_data.length" :key="el + '_key'" :style="{ 
                        padding: '0px 20px',
                        textDecoration: selectList_2.indexOf(el - 1) != -1 ? 'underline' : 'auto'
                    }">
                        {{ el - 1 }}
                    </span>
                </span>
                <span>
                    <span style="font-size: 30px;">&rarr;</span>
                    Like
                </span>
            </div>
            <div style="display: flex;">
                <VueDraggable v-model="list_2" :animation="150" :group="{name: 'painting', pull: true, put: elCheck(list_2)}" ghost-class="dragElement" :style="{
                                    width: '100%',
                                    height: '100%',
                                    minHeight: '100px',
                                    paddingTop: '0px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }" @add="onAdd2">
                    <div v-for="(item, i) in list_2" :key="item.id" style="width:calc(10vw - 1px); text-align: center; cursor: all-scroll;" @click="click_select_id(parseInt(item.id), 1)">
                        <div style="font-size: 20px; margin-bottom: 3px; cursor: pointer;">
                            <span :style="{
                                    border: parseInt(item.id) == select_id[1] ? 'solid 1px rgba(11, 11, 11, .3)' : 'solid 1px white',
                                    backgroundColor: parseInt(item.id) == select_id[1] ? 'rgba(11, 11, 11, .1)' : 'white',
                                    borderRadius: '5px',
                                    padding: '0px 20px'
                                }">
                                    {{ item.id }}
                                </span>
                        </div>
                        <img :src="item.path" alt="" style="width: 85%;">
                    </div>
                </VueDraggable>
    
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "@/stores/counter";
import painting_info from '/public/data_description.json';
import { VueDraggable } from 'vue-draggable-plus';
export default {
    name: "APP",
    props: ["pattern"],
    data() {
        return {
            painting_data: [],
            list_1: [],
            list_2: [],
            selectList_1: [],
            selectList_2: [],
            select_id: [-1, -1],
            selectElementIndex: -1
        };
    },
    methods: {
        dataProcess(data, cnt, info) {
            // console.log(data.data[cnt], cnt, data);
            let path_data = data.data[cnt][info].fig_info;
            path_data = this.shuffleArray(path_data);
            let name = data.data[cnt].name;
            let type = data.data[cnt][info].type;
            let res_data = new Array();
            console.log(name, path_data, data.data[cnt], type, info)
            for (let i in path_data) {
                res_data.push({
                    type: type,
                    id: i,
                    path: 'painting/' + name + '/' + path_data[i]
                });
            }
            return res_data;
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        elCheck (data) {
            // console.log(data);
            for (let i in data) {
                if (data[i]['id'] == this.selectElementIndex) {
                    return false;
                }
            }
            if (data.length >= 10) return false;
            return true;
        },
        onClone(evt) {
            console.log('clone');
            this.selectElementIndex = evt.oldIndex;
        },
        onAdd1(evt) {
            this.selectList_1.push(evt.oldIndex)
        },
        onAdd2(evt) {
            this.selectList_2.push(evt.oldIndex)
        },
        click_select_id(id, cnt) {
            this.select_id[cnt] = id;
        }
    },
    created() {},
    mounted() {
        this.painting_data = this.dataProcess(painting_info, this.pattern.cnt, this.pattern.info);
        const dataStore = useDataStore();
        dataStore.tmpPaintingData.pattern = this.pattern;
    },
    watch: {
        list_1: {
            handler() {
                const dataStore = useDataStore();
                dataStore.tmpPaintingData.list_1 = this.list_1;
            },
            deep: true
        },
        list_2: {
            handler() {
                const dataStore = useDataStore();
                dataStore.tmpPaintingData.list_2 = this.list_2;
            },
            deep: true
        },
        select_id: {
            handler() {
                const dataStore = useDataStore();
                dataStore.tmpPaintingData.select_id = this.select_id;
            },
            deep: true
        },
    },
    components: { VueDraggable }
}
</script>

<style>
.image-container {
    display: flex;
    flex-wrap: wrap;
}

.input-container {
    justify-content: center;
}

.dragElement {
    /* color: red; */
    /* border: solid 1px black; */
    width: calc(10vw - 1px);
    height: calc(8vh);
}

.default {
    max-height: calc(20vh + 30px);
    max-width: 20%;
    /* height: 10vh */
}
</style>
