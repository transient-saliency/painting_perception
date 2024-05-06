/*
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-11-20 19:23:35
 * @LastEditTime: 2022-11-22 17:18:36
 */

import axios from 'axios';

// axios.defaults.withCredentials = true
const TEST_URL_PREFIX = 'http://43.153.168.84:8000/apis';

export function fetchHello(param, callback) {
    const url = `${TEST_URL_PREFIX}/hello/`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        }, errResponse => {
            console.log(errResponse)
        })
}

export function uploadData(param, callback) {
    const url = `${TEST_URL_PREFIX}/upload/`;
    axios.post(url, param)
    .then(response => {
        callback(response.data);
    }, errResponse => {
        console.log(errResponse);
    })
}

export function fetchAllData(param, callback) {
    const url = `${TEST_URL_PREFIX}/fetch/`;
    axios.post(url, param)
    .then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    })
}

export async function queryRecommendation(param) {
    const url = `${TEST_URL_PREFIX}/Recommendation`;
    const jsonString = JSON.stringify(param);
    const data = await axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: jsonString
    })
    return data;
}

export async function queryNewTag(param) {
    const url = `${TEST_URL_PREFIX}/NewTag`;
    const jsonString = JSON.stringify(param);
    const data = await axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: jsonString
    })
    return data;
}

export async function saveData(param) {
    const url = `${TEST_URL_PREFIX}/Save`;
    const jsonString = JSON.stringify(param);
    const data = await axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: jsonString
    })
    return data;
}

export async function tagOptimize(param) {
    const url = `${TEST_URL_PREFIX}/TagOp`;
    const jsonString = JSON.stringify(param);
    const data = await axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: jsonString
    });
    return data;
}