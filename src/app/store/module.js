/**
 * TYPES
 */
const UPDATE_FOO = 'UPDATE_FOO'

/**
 * STATE
 */
const state = {
  foo: 'bar'
}

/**
 * GETTERS
 */
const getters = {
  foo ({foo}) {
    return foo
  }
}

/**
 * ACTIONS
 */
const actions = {
  updateFoo ({commit, dispatch, state, rootState}, val) {
    commit(UPDATE_FOO, val)
  }
}

const mutations = {
  [UPDATE_FOO] (state, val) {
    state.foo = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
