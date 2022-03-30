import axios from "axios";
import { MessageBox, Message } from "element-ui";

const service = axios.create({
  timeout: 12000, // request timeout
});
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 1) {
      if (res.code === 301 || res.code === 302) {
        MessageBox.confirm("登录状态失效，请退出重新登录", "确认退出", {
          confirmButtonText: "重新登录",
          cancelButtonText: "关闭",
          type: "warning",
        }).then(() => {
          removeToken();
          location.reload();
        });
      }
      Message.error(res.msg);
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err", error);
    Message.error(error.message);
    return Promise.reject(error);
  }
);
export default service;
