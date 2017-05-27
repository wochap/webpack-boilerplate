import {isProduction} from './constants'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './rootRoutes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: isProduction ? 'history' : 'hash',
  linkActiveClass: 'is-active',
  routes
})

export default router
