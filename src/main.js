import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'yhCODqBHGpGUWOhiDdUbQijd'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')