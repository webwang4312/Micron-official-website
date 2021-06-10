import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: '',
        loading: true,
        blues: false, cancelTokenArr: [] // 取消请求token数组
    },
    mutations: {
        bluesState(state, item) {

            // console.log(item);
            state.blues = item
            //console.log(state.blues);
        }, pushToken(state, payload) {
            state.cancelTokenArr.push(payload.cancelToken)
            // console.log(state.cancelTokenArr);
        },
        clearToken({ cancelTokenArr }) {
            cancelTokenArr.forEach(item => {
                item('路由跳转取消请求')
            })
            cancelTokenArr = []
        }
    },
    actions: {},
    modules: {}
});