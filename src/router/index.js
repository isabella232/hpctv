import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Specs from '../components/Specs'
import RealData from '../components/Implications'
import CaseStudies from '../components/CaseStudies'
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
      path: '/implications',
      name: 'implications',
      component: RealData
    },
    {
      path: '/case-studies',
      name: 'case-studies',
      component: CaseStudies
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }

  ]
})
