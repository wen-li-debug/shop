import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.css'

// 引入第三方插件树形结构
import treeGrid from 'vue-table-with-tree-grid'

Vue.component('tree-grid', treeGrid)

Vue.config.productionTip = false
Vue.use(ElementUI)
console.log(Vue.version)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
