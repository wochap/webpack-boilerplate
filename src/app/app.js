import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import store from './store'
import router from './config/router'
import registerComponents from './config/registerComponents'
import registerFilters from './config/registerFilters'
import Root from './components/Root'

/**
 * VUE CONFIG
 */
registerFilters(Vue)
registerComponents(Vue)

sync(store, router)

const app = new Vue({
  router,
  store,
  ...Root
})

export {app, router, store}
