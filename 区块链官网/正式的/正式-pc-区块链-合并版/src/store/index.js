import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        menu: true,
        count: '',
        loading: true,
        pcblues: false,
        mblues: false,
        cancelTokenArr: [] // 取消请求token数组
    },
    mutations: {
        pcBluesState(state, item) {
            state.pcblues = item;
        },
        mBluesState(state, item) {
            state.mblues = item
        },
        menuState(state, item) {
            state.menu = item
        },
        pushToken(state, payload) {
            state.cancelTokenArr.push(payload.cancelToken)
            // console.log(state.cancelTokenArr);
        },
        clearToken({ cancelTokenArr }) {
            cancelTokenArr.forEach(item => {
                // item('路由跳转取消请求')
            })
            cancelTokenArr = []
        }
    },
    actions: {},
    modules: {}
});