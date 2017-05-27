<template>
  <div>
    <h1>AppScreen</h1>

    Foo: {{foo}}

    <input :value="foo" @input="event => updateFoo(event.target.value)" type="text" />
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['foo'])
    },
    methods: {
      ...mapActions(['updateFoo'])
    }
  }
</script>

<style lang="scss">
</style>
