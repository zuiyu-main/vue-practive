import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/test'
import demo from '@/components/DemoTree'
import vuex from '@/components/vuex'
import indexDB from '@/components/IndexDB'
import jsstore from '@/components/JsStore'
import ZangoDB from '@/components/ZangoDB'
import MiNiMonogo from '@/components/MiNiMongo'
import Stomp from '@/components/Stomp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/tree',
      name: 'tree',
      component: demo
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: vuex
    },
    {
      path: '/indexdb',
      name: 'indexdb',
      component: indexDB
    },
    {
      path: '/jsstore',
      name: 'jsstore',
      component: jsstore
    },
    {
      path: '/zangodb',
      name: 'zangodb',
      component: ZangoDB
    },
    {
      path: '/minimongo',
      name: 'minimongo',
      component: MiNiMonogo
    },
    {
      path: '/stomp',
      name: 'stomp',
      component: Stomp
    }
  ]
})
