/*
 * @Author: yaoyuting
 * @Date: 2019-08-24 00:01:48
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-04-16 07:39:51
 * @Descripttion: 
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fixeds:false
  },
  mutations: {
   toFixed(state,val){
    state.fixeds=val
  }

  },
  actions: {

  },
});
