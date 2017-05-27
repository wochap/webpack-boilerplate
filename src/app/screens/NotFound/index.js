export default {
  path: '*',
  name: 'NotFound',
  component: (resolve) => {
    require.ensure([], (require) => {
      resolve(require('./components/NotFoundScreen.vue'))
    }, 'NotFoundScreen')
  }
}
