import originAxios from 'axios';

export default function axios(option) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = originAxios.create({
      //baseURL: 'http://106.55.146.46:8888',
      //baseURL: 'http://10.189.83.243:8888',
	    baseURL: 'http://221.178.114.105:8000/smartwater',
      timeout: 5000,
    });

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      (config) => {
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画
        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
        if (sessionStorage.getItem('token')) {
          config.headers.token = sessionStorage.getItem('token');
        }
        // 3.对请求的参数进行序列化(看服务器是否需要序列化)
        // config.data = qs.stringify(config.data)

        // 4.等等
        return config;
      },
      (err) => {
        return err;
      }
    );

    instance.interceptors.response.use(
      (response) => {
        if (response.data.code === '401') {
          // top.location.href = "/web-server/logout";
        }
        return response.data;
      },
      (err) => {
        console.log(err);
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误';
              break;
            case 401:
              top.location.href = "/web-server/logout";
              err.message = '未授权的访问';
              break;
          }
        }
        return err;
      }
    );

    // 2.传入对象进行网络请求
    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
