
import axios from 'axios';
import qs from 'qs';
// 创建axios实例
const service = axios.create({
    // api 的 base_url
     //baseURL: 'http://47.98.110.210:8081/',
    timeout: 50000 // 请求超时时间(因为需要调试后台,所以设置得比较大)
})

// request拦截器(请求前的处理)
service.interceptors.request.use(
    config => {
        // if (store.getters.token) {
        //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        // }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response 拦截器(数据返回后的处理)
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 200) {
            return response.data
        } else if (res.code === 500) {
            window.location.href = "/"
            // 跳转到登陆页面
        } else {
            return Promise.reject('error')
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)



export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function getss(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url,
            xhrFields: {
                withCredentials: true
            }, //前端适配：允许session跨域 
            crossDomain: true,
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
// xhrFields: {withCredentials:true}, //前端适配：允许session跨域 crossDomain: true,

export function gets(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url,
            responseType: "blob",
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data), {
            // headers: {
            //     Accept: "application/x-www-form-urlencoded; charset=utf-8",
            //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
            // }
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

export function posts(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
            }
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

