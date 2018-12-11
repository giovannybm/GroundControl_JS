import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainWindows',
      component: require('@/components/defaultView').default
    },
    {
      path: '/inspire',
      name: 'inspire',
      component: require('@/components/alternativeView').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
