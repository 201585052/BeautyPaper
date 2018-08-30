'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'

const tUrl = 'https://unsplash.com/'
const dir = './images'
var imgs = []

var download = function (src, dir, filename) {
  superagent.get(src).pipe(fs.createWriteStream(dir + '/' + filename))
}
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })
  superagent.get(tUrl)
    .end((err, res) => {
      if (err) {
        return console.log(err)
      }
      var $ = cheerio.load(res.text)
      $('._2zEKz').each((index, element) => {
        var $src = $(element).attr('srcset')
        imgs.push($src)
      })
      ipcMain.on('asynchronous-message', (event, Id) => {
        console.log(Id) // prints 传来的图片Id
        event.sender.send('asynchronous-reply', imgs)
        if (Id > 0 && Id !== 'liaoliao') {
          download(imgs[Id], dir, Math.floor(Math.random() * 1000) + imgs[Id].substr(-3, 4) + '.jpg')
        }
      })
    })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
