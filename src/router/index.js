import Vue from 'vue'
import Router from 'vue-router'
import pageDefault from '@/layout/default'
import pageBlank from '@/layout/blank'
import Index from '@/page/index.vue'
import changeCity from '@/page/changeCity.vue'
import goodsList from '@/page/goodsList.vue'
import login from '@/page/login.vue'
import register from '@/page/register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
    path: '/',
    name: 'default',
    component: pageDefault,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'index',
      component: Index
      },
      {
        path: '/changeCity',
        name: 'changeCity',
        component: changeCity
      },
      {
        path: '/s/:name',
        name: 'goods',
        component: goodsList
      }]
  },
  {
    path: '/blank',
    name: 'blank',
    component: pageBlank,
    children: [
      {
        path: 'login',
        name: 'login',
        component: login
      },
      {
        path: 'register',
        name: 'register',
        component: register
      }
    ]
  }]
})
