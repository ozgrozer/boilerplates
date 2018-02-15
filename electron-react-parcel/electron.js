const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let win

const createWindow = () => {
  win = new BrowserWindow({ width: 640, height: 480 })
  win.loadURL(isDev ? 'http://localhost:1234' : `file://${__dirname}/public/index.html`)
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
