import axios from 'axios';

import {message} from 'antd';
//全局的axios默认请求域名
axios.defaults.baseURL='http://localhost:8080/admin';

//请求拦截
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem("Token")){
        //设置统一的请求头header
        config.headers.Authorization=localStorage.getItem("Token")
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    
    //获取错误状态码
    const { status }=error.response;
    if(status===401){//401状态码表示请求要求用户的身份认证
        message.error("token失效，请重新登陆！");
        //清除token
        localStorage.removeItem("Token");
        //跳转到登陆页面
        window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

  export default axios;