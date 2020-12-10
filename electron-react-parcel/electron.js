const isDev = require('electron-is-dev')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 640,
    height: 480
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:1234')
  } else {
    mainWindow.loadFile('./public/index.html')
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
