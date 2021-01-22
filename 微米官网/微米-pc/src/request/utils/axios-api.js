import axios from "axios";
import { Message } from "element-ui";
// 请求前做的事
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    Message.error({ message: "请求超时" });
    return Promise.resolve(err);
  }
);

// 请求后做些什么
axios.interceptors.response.use(
  data => {
    if (data.status && data.status == 200 && data.data.status == "error") {
      Message.error({ message: data.data.msg });
      return;
    }
    return data;
  },
  err => {
    console.log(err);
    if (!err.response) {
      return Message({ message: "正在加载请稍后" });
    }
    if (err.response.status == 504 || err.response.status == 404) {
      Message.error({ message: "服务器又炸了？" });
    } else if (err.response.status == 403) {
      Message.error({ message: "权限不足,请联系管理员!" });
    } else {
      Message.error({ message: "网络连接失败" });
    }
    return Promise.resolve(err);
  }
);

export function getRequest(url, { params: { }, headers: { } }) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: {}, headers: {'language':this.nowLang} },
    )
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function postRequest(url, data={ }, {headers: { } }) {
  return new Promise((resolve, reject) => {
    axios
      .post(url,{}, {headers:{'language':this.nowLang}})
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function putRequest(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function deleteRequest(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
