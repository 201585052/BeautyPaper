<template>
  <div id="app">
    <Carousel v-bind:imgs="imgs"/>
  </div>
</template>

<script>
  import Carousel from './components/Carousel'

  export default {
    name: 'App',
    components: {
      Carousel
    },
    props: {
      imgs: {
        type: Array,
        required: true
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
