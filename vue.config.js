module.exports = {
	//prefix
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'xxx';
      return args;
    });
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        content: 'components/content',
        common: 'components/common',
        assets: '@/assets',
        network: '@/network',
        views: '@/views',
        common: '@/common',
      },
    },
  },
  devServer: {
    port: 8080, // 端口号
    host: '',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    disableHostCheck: true,
    proxy: {
      // '/meituan': {     //这里最好有一个 /
      //     target: 'http://10.189.40.185:8080/web-server/interface/meituan/',  // 后台接口域名
      //     //ws: true,        //如果要代理 websockets，配置这个参数
      //     //secure: false,  // 如果是https接口，需要配置这个参数
      //     changeOrigin: true,  //是否跨域
      //     pathRewrite:{
      //         '^/meituan':''
      //     }
      // },
      // '/partners': {     //这里最好有一个 /
      //   target: 'http://10.189.40.176:8081/web-server/interface/partners/',  // 后台接口域名
      //   //ws: true,        //如果要代理 websockets，配置这个参数
      //   //secure: false,  // 如果是https接口，需要配置这个参数
      //   changeOrigin: true,  //是否跨域
      //   pathRewrite: {
      //     '^/partners': ''
      //   }
      // }
      // '/chengyuBigdata': {
      //   //这里最好有一个 /
      //   target:
      //     'http://10.189.40.180:8080/web-server/interface/chengyuBigdata/', // 后台接口域名
      //   //ws: true,        //如果要代理 websockets，配置这个参数
      //   //secure: false,  // 如果是https接口，需要配置这个参数
      //   changeOrigin: true, //是否跨域
      //   pathRewrite: {
      //     '^/chengyuBigdata': '',
      //   },
      // },
      '/longFor': {
        //这里最好有一个 /
        target:
          'http://xxx.243:8888', // 后台接口域名
        //ws: true,        //如果要代理 websockets，配置这个参数
        //secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/longFor': '',
        },
      },

      

      // '/api': {
      //   target: 'http://10.189.43.31:8080',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/api',
      //   },
      // },
    },
  },
};
