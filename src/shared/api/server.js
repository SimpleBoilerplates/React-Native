'use strict';


import {url} from '../constant/credential';
import axios from 'axios';
import to from 'await-to-js';
import AsyncStorage from '@react-native-community/async-storage';

async function _get(url){
    let token = await AsyncStorage.getItem('token');
    if(!token) return false;
    let [err,data] = await to(axios.get(`${url}${url}`,{
        headers:{
            "Authorization":token
        }
    }));
    console.log(`${SERVER}${url}`,token);
    if(err || data.data.error) return null;
    return data.data.data;
}

async function _post(endpoint,payload){
    console.log(payload,`${url}${endpoint}`);
    let token = await AsyncStorage.getItem('token');
    if(!token) return false;
    console.log(JSON.stringify(payload));
    let [err,data] = await to(axios.post(`${url}${endpoint}`,payload,{
        headers:{
            "Authorization":token
        }
    }))
    console.log(err,data);
    if(err || data.data.error) return null;
    return data.data;
}

export {_get,_post}