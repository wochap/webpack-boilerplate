import {isDeveloment} from 'app/config/constants'
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import module from './module'

Vue.use(Vuex)

const store = new Vuex.Store({ // eslint-disable-line
  ...module,
  strict: isDeveloment,
  plugins: isDeveloment ? [createLogger()] : []
})

export default store

if (module.hot) {
  module.hot.accept(() => {
    store.hotUpdate({
      ...module
    })
  })
}
