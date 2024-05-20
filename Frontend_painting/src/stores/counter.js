/*
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2023-02-02 15:02:39
 */
import {
    fetchAllData,
    fetchHello, uploadData, queryRecommendation, queryNewTag, saveData, tagOptimize
} from "../service/module/dataService";
import {
    ref,
    computed
} from "vue";
import {
    defineStore
} from "pinia";

// export const useCounterStore = defineStore("counter", {
//   const count = ref(0);
//   const doubleCount = computed(() => count.value * 2);
//   function increment() {
//     count.value++;
//   }

//   return { count, doubleCount, increment };
// });

export const useDataStore = defineStore("dataStore", {
    persist: true,
    state: () => {
        return {
            msg: 'Hello, Vue SQ',
            tmpPaintingData: {
                list_1: [],
                list_2: [],
                pattern: [],
                select_id: []
            },
            allPaintingData: [],
            allData: {
                info: {},
                data: []
            },
            info: {},
            temAccuracy: {
                right: 0,
                wrong: 0
            },
            eventSeq: [],
            setting: {
                group_num: 10,
                show_time: 2,
                relax_time: 30,
                gap_relax_time: 10
            }
        }
    },
    actions: {
    }
})