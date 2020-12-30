import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 登录注册
        login: localStorage.getItem('login'),
        slidershow: false,
        ysmenceng: false,
        username: '',
        userId: '',
        fastoken: true,
        fastoken2: true,
        // 绑定查看钱包
        fastokenbind: false,
        fastokenbind2: false,
        votenumberstate:false,
        registrationtask:false

    },
    mutations: {
        RegistrationTask(state){
            state.registrationtask = !state.registrationtask;
        },
        voteNumber(state){
            state.votenumberstate = !state.votenumberstate;  
        },
        
         // 绑定查看钱包
        fastokenbind(state) {
            state.fastokenbind = false
        },
        fastokenbinds(state) {
            state.fastokenbind = true
        },
        fastokenbind2(state) {
            state.fastokenbind2 = false
        },
        fastokenbind2s(state) {
            state.fastokenbind2 = true
        },
        fastoken(state) {
            state.fastoken = false
        },
        fastokenhide(state) {
            state.fastoken = true
        },
        fastoken2(state) {
            state.fastoken2 = false
        },
        fastokenhide2(state) {
            state.fastoken2 = true
        },
        // 登录注册
        login(state) {
            state.login = !state.login
        },
        loginfalse(state) {
            return state.login =true
        },
        sliderShow(state) {
            // console.log(state.slidershow);
            state.slidershow = !state.slidershow
        },
        showSliderFalse(state) {
            state.slidershow = false
        },
        menCeng(state) {
            state.ysmenceng = true;
        },
        menCengHide(state) {
            state.ysmenceng = false;
        }
    },
    actions: {},
    modules: {}
});