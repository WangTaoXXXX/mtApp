// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import store from './store.js'
Vue.use(ElementUI)

Vue.config.productionTip = false
// 自定义事件
Vue.directive('document-click', {
  bind (el, binding, VNode) { // 只调用一次，指令第一次绑定到元素时调用
    document.addEventListener('click', binding.value, false)
  },
  inserted () { // 组件被插入父组件的时候调用
    // console.log('inserted')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
