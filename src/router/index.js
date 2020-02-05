import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Specs from '../components/Specs'
import LiveData from '../components/LiveData'
import Projects from '../components/Projects'
import NotFound from '../components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: '/',
      component: Home
    },
    {
      path: '/specs',
      name: 'specs',
      component: Specs
    },
    {
      path: '/live-data',
      name: 'live-data',
      component: LiveData
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }

  ]
})
