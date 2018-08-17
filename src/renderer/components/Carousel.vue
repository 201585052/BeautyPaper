<template>
  <div id="topBanner" class="slide">
    <div v-for="(imgUrl, index) in bannerList" v-show="index===mark" :key="index" class="slideshow">
        <img :src=imgUrl>
    </div>
    <div class="bar">
      <span v-for="(item, index) in bannerList" :class="{ 'active':index===mark }" :key="index"></span>
    </div>
    <div class="cleft"><img src="static/images/left.png"></div>
    <div class="cright"><img src="static/images/right.png"></div>
  </div>
</template>

<script>
  const {ipcRenderer} = require('electron')
  var recImgs
  ipcRenderer.on('ping', (e, msgs) => {
    recImgs = msgs // 注意异步问题，等下载好了才发回来orz
    console.log(recImgs)
  })
  export default {
    data () {
      return {
        mark: 0,
        bannerList: ['static/images/1.jpg', 'static/images/2.jpg', 'static/images/3.jpg']
      }
    },
    methods: {
      autoPlay () {
        this.mark++
        if (this.mark === 3) {
          this.mark = 0
        }
      },
      play () {
        setInterval(this.autoPlay, 2500)
      },
      change (i) {
        this.mark = i
      }
    },
    created () {
      this.play()
    }
  }
</script>

<style>
    .slide {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      height: 100vh;
    }
    
    .slideshow {
      width: 100%;
      background-size: cover;
    }
    .slideshow img{
      width: 100%;
      height: 100vh;
    }
    li {
      position: absolute;
    }
    .cleft{
      position: absolute;
      top:45%;
      cursor: pointer;
    }
    .cleft img{
      width: 10vw;
    }
    .cright{
      position: absolute;
      top:45%;
      right: 0;
      cursor: pointer;
    }
    .cright img{
      width: 10vw;
    }
    .bar {
      position: absolute;
      width: 100%;
      bottom: 10px;
      margin: 0 auto;
      z-index: 10;
      text-align: center;
    }
    
    
    .bar span {
      width: 20px;
      height: 5px;
      border: 1px solid;
      background: white;
      display: inline-block;
      margin-right: 10px;
    }
    
    .active {
      background: #bfd6b6 !important;
    }
</style>