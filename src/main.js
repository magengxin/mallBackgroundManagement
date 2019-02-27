import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// import Blob from './excel/Blob.js'
// import Export2Excel from './excel/Export2Excel.js'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'

import * as filters from './filters'
Object.keys(filters).forEach(v => {
  Vue.filter(v,filters[v])
})
import '@/icons' // icon
import '@/permission' // permission control
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
