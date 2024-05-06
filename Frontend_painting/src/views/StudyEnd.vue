<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2024-04-10 15:48:49
-->
<template>
    <div class="common-layout" style="width: 100%; height: 100vh;" v-loading="!initSign" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="firework" :style="{position: 'absolute', zIndex: 100, height: 'calc(100% - 20px)', width: '100%', color: 'black', backgroundColor: 'rgba(0, 0, 0, 0)', transition: '1s', opacity: 1 }">
            <div style="position: absolute; top: calc(50% - 250px); left: calc(50% - 256px);">
            <h1 style="font-family: STKaiti;">保存成功, 实验结束</h1>
            <h1 style="font-family: STKaiti;">Save Successfully, the experiment is finished</h1>
            <div style="font-size: 25px; font-family: STKaiti; margin-top: 30px;">感谢您参加用户实验！</div>
            <div style="font-size: 25px; font-family: STKaiti, sans-serif;;">Thank you for participating in the User Study!</div>
            <div style="font-size: 25px; font-family: STKaiti;">祝您有美好的一天！</div>
            <div style="font-size: 25px; font-family: STKaiti;">Have a nice day!</div>
        </div>
        
        </div>
    </div>
</template>
  
<script>
import { useDataStore } from "../stores/counter";

import { Fireworks } from 'fireworks-js';

export default {
    name: "home_view",
    data() {
        return {
            msgH: null,
            fireworks_item: null
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
        this.playFireworks();
    },
    methods: {
        closePage() {
            window.close();
        },
        playFireworks() {
            if (this.fireworks_item == null){
            const container = document.querySelector('.firework')
            this.fireworks_item = new Fireworks(container, {
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.5,
                particles: 50,
                traceLength: 3,
                traceSpeed: 10,
                explosion: 5,
                intensity: 30,
                flickering: 50,
                lineStyle: 'round',
                hue: {
                    min: 0,
                    max: 360
                },
                delay: {
                    min: 30,
                    max: 60
                },
                rocketsPoint: {
                    min: 50,
                    max: 50
                },
                lineWidth: {
                    explosion: {
                        min: 1,
                        max: 3
                    },
                    trace: {
                        min: 1,
                        max: 2
                    }
                },
                brightness: {
                    min: 50,
                    max: 80
                },
                decay: {
                    min: 0.015,
                    max: 0.03
                },
                mouse: {
                    click: false,
                    move: false,
                    max: 1
                }
            })}
            this.fireworks_item.start();
            this.saveTag = true;
        },
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
  