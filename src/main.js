import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { FormModel } from 'ant-design-vue';
Vue.use(FormModel);
import mock from '../src/mock/mock'
Vue.config.productionTip = false
Vue.use(Antd);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
