import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
// import '@mdi/font/css/materialdesignicons.css';
import colors from 'vuetify/es5/util/colors'

import config from './config/config'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: config.locale, // set locale
  fallbackLocale: 'es',
  messages:{
    es:require('./config/locales/I18n-es.json'),
    en:require('./config/locales/I18n-en.json')
  }
})

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: colors.lightGreen.base,
    accent: colors.red.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
    darkTheme: colors.grey.darken4
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }

})



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
