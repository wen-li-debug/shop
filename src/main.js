import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.css'
// 引入时间Dayjs 插件
import './utils/dayjs.js'

// 引入第三方插件树形结构
import treeGrid from 'vue-table-with-tree-grid'

import VueQuillEditor from 'vue-quill-editor'

// 注册 vue-quill-editor
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)

Vue.component('tree-grid', treeGrid)

Vue.config.productionTip = false
Vue.use(ElementUI)
console.log(Vue.version)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
