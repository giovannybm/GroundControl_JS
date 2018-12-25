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
      path: '/1',
      name: '1',
      component: require('@/components/1').default
    },
    {
      path: '/2',
      name: '2',
      component: require('@/components/2').default
    },
    {
      path: '/3',
      name: '3',
      component: require('@/components/3').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
