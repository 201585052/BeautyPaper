<template>
  <div id="topBanner" class="slide">
    <div v-for="(imgUrl, index) in imgs" v-show="index===mark" :key="index" class="slideshow">
        <img :src=imgUrl>
    </div>
    <div class="bar">
      <span v-for="(item, index) in imgs" :class="{ 'active':index===mark }" :key="index"></span>
    </div>
    <div class="chose">选做桌面</div>
    <div class="cleft" @click="goLeft"><img src="static/images/left.png"></div>
    <div class="cright" @click="goRight"><img src="static/images/right.png"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mark: 0,
        len: this.imgs.length
      }
    },
    props: {
      imgs: {
        type: Array,
        required: true
      }
    },
    methods: {
      goRight () {
        this.mark++
        if (this.mark === this.len) {
          this.mark = 0
        }
      },
      goLeft () {
        this.mark--
        if (this.mark === 0) {
          this.mark = this.len
        }
      },
      change (i) {
        this.mark = i
      }
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
      width: 100vw;
      height: 100vh;
    }
    li {
      position: absolute;
    }
    .chose{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100px;
      height: 30px;
      margin: auto;
      border: 1px solid #fff;
      padding: 10px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      opacity: 0.3;
      cursor: pointer;
    }
    .chose:hover{
      color: cornflowerblue;
      transition: all .5s ease;
      opacity: 1;
      background-color: #fff;
      box-shadow: 1px 1px 10px #333333;
    }
    .cleft{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      width: 10vw;
      cursor: pointer;
    }
    .cleft img{
      width: 100%;
    }
    .cright{
      position: absolute;
      top:50%;
      right: 0;
      width: 10vw;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .cright img{
      width: 100%;
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
