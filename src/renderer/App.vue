<template>
  <div id="app">
    <Carousel v-bind:imgs="imgs" @sendId="getId"/>
  </div>
</template>

<script>
  import Carousel from './components/Carousel'

  export default {
    name: 'App',
    components: {
      Carousel
    },
    data () {
      return {
        Id: 0
      }
    },
    props: {
      imgs: {
        type: Array,
        required: true
      }
    },
    methods: {
      getId (Id) {
        this.Id = Id
        this.$emit('sendId', this.Id)
      }
    }
  }
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
</style>
