import axios from "axios";
import { Alert } from "react-native";
// import NProgress from 'nprogress'

// 'http://119.23.201.183:4001'

const alert = message => {
  Alert.alert(
    "Alert Title",
    message,
    [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed")
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );
};
const instance = axios.create({
  baseURL: "https://blog.migaox.com",
  timeout: 20000 // 请求超时时间
});

let timer;

//拦截请求
instance.interceptors.request.use(
  config => {
    config.url = "/api" + config.url;
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.common.Authorization = "Bearer " + token;
    // }
    return config;
  },
  error => {
    alert(error);
    Promise.reject(error);
  }
);
//拦截响应
instance.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      //   response.message && message.warning(response.message);
      alert("请求不等于200");
      return Promise.reject(response.data);
    }
    return response.data;
  },
  err => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (err && err.response) {
        alert(err);
        // switch (err.response.status) {
        //   case 400:
        //     // message.error("错误请求");
        //     break;
        //   case 401:
        //     // localStorage.clear();
        //     // message.error("登录信息过期或未授权，请重新登录！");
        //     break;
        //   case 403:
        //     // message.error("拒绝访问！");
        //     break;
        //   case 404:
        //     // message.error("请求错误,未找到该资源！");
        //     break;
        //   case 500:
        //     // message.error("服务器出问题了，请稍后再试！");
        //     break;
        //   default:
        //     // message.error(`连接错误 ${err.response.status}！`);
        //     break;
        // }
      } else {
        // message.error("服务器出了点小问题，请稍后再试！");
      }
    }, 200); // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err);
  }
);

export default instance;
