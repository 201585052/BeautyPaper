import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false
const {ipcRenderer} = require('electron')
var recImgs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  created () {
    ipcRenderer.on('ping', (e, msgs) => {
      recImgs = msgs // 注意异步问题，等下载好了才发回来orz
      this.imgs = recImgs
    })
  },
  data () {
    return {
      imgs: []
    }
  },
  components: { App },
  template: '<App v-bind:imgs="imgs" />'
})
