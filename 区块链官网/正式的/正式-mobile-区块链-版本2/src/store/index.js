import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: '',
        loading: true,
        blues: false,
        menu:true
    },
    mutations: {
        bluesState(state, item) {
            // console.log(state.blues);
            // console.log(item);
            state.blues = item
        },
        menuState(state, item){
            state.menu = item
        }
    },
    actions: {},
    modules: {}
});