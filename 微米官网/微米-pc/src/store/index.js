import Vue from "vue";
import Vuex from "vuex";
// import { fromMapFileSource, log } from "../babel";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 登录注册昵称登出
        login: true,
        // 弹出登录注册
        showlogin: false,
        // 点击登录注册哪一个
        number: '',
        // 忘记密码
        forget: false,
        username: '',
        userId: '',
        fastoken: false,
        fastokensecond: false,
        votenumber: false,
        votenumbers: '',
        registrationtask:false

    },
    mutations: {
        RegistrationTask(state){
            state.registrationtask = !state.registrationtask;
        },
        voteNumber(state) {
            state.votenumber = !state.votenumber;
        },
        // 登陆的显示与隐藏
        loginShow(state) {
            state.showlogin = !state.showlogin;

        },
        // 绑定钱包显示与隐藏
        fastokenShow(state) {
            // console.log(state.fastoken);
            if (state.fastoken == false) {
                return state.fastoken = true
            }
            if (state.fastoken == true) {
                return state.fastoken = false
            }
        },
        fastokensecondShow(state) {
            // console.log(state.fastoken);
            if (state.fastokensecond == false) {
                return state.fastokensecond = true
            }
            if (state.fastokensecond == true) {
                return state.fastokensecond = false
            }
        },
        fastokenHide(state) {
            if (state.fastoken == true) {
                return state.fastoken = false
            }
        },
        fastokensecondHide(state) {
            if (state.fastokensecond == true) {
                return state.fastokensecond = false
            }
        },
        // 头部登录注册选择
        numberShow(state) {
            return state.number = 0
        },
        numberShow2(state) {
            return state.number = 1
        },
        leavelogin(state) {
            localStorage.setItem('loginState', new Date())
            state.username = undefined;
            const store = {
                password1: '',
                token: '',
                userId: '',
                username: '',
                username1: '',
            }
            localStorage.setItem('store', JSON.stringify(store));
        },
        login(state) {
            return state.login = false
        },
        // 忘记密码页面显示
        forget(state) {
            if (state.forget == false) {
                return state.forget = true;
            }
        },
        // 忘记密码页面隐藏
        forgetlogin(state) {
            if (state.forget == true) {
                return state.forget = false
            }
        },
        // 绑定钱包隐藏
        forgetFastoken(state) {
            if (state.fastoken == true) {
                return state.fastoken = false
            }
        },
    },
    actions: {
        login(context) {
            context.commit('login')
        },
        // 登陆的显示与隐藏
        loginShow(context) {
            context.commit('loginShow')
        },
        // 绑定钱包显示与隐藏
        fastokenShow(context) {
            context.commit('fastokenShow')
        },
        fastokensecondShow(context) {
            context.commit('fastokensecondShow')
        },
        fastokenHide(context) {
            context.commit('fastokenHide')
        },

        // 头部登录注册选择
        numberShow(context) {
            context.commit('numberShow')
        },
        numberShow2(context) {
            context.commit('numberShow2')
        },
        leavelogin(context) {
            context.commit('leavelogin')
        },
        // 忘记密码页面显示
        forget(context) {
            context.commit('forget')
        },
        // 忘记密码页面隐藏
        forgetlogin(context) {
            context.commit('forgetlogin')
        },
        // 绑定钱包隐藏
        forgetFastoken(context) {
            context.commit('forgetFastoken')
        },
    },
    modules: {}
});