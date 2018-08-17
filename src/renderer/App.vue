<template>
  <div id="app">
    <Carousel />
    <div>{{imgs}}</div>
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
