export default {
  path: '/',
  name: 'App',
  component: (resolve) => {
    require.ensure([], (require) => {
      resolve(require('./components/AppScreen.vue'))
    }, 'AppScreen')
  }
}
