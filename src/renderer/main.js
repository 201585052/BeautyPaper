import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false
const {ipcRenderer} = require('electron')
var recImgs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  created () {
    ipcRenderer.on('asynchronous-reply', (event, imgs) => {
      recImgs = imgs
      this.imgs = recImgs
    })// 这里是渲染进程先打开的发送信息的通道
    ipcRenderer.send('asynchronous-message', 'liaoliao') // 这里不可以后加，通信的通道要在建立起时打开
  },
  mounted () {
    this.$watch('Id', (newVal, oldVal) => {
      if (newVal !== oldVal) {
        ipcRenderer.send('asynchronous-message', newVal)
      }
    })
  },
  data () {
    return {
      imgs: [],
      Id: 0
    }
  },
  methods: {
    getId (Id) {
      console.log(Id)
      this.Id = Id
    }
  },
  components: { App },
  template: '<App v-bind:imgs="imgs" @sendId="getId" />'
})
