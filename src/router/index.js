import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Specs from '../components/Specs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/specs',
      name: 'specs',
      component: Specs
    }
  ]
})
