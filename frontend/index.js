const electron = require('electron')
const path = require('path')
var nativeImage = require('electron').nativeImage

const { app, BrowserWindow } = electron

app.on('ready', () => {
  const mainWindow = new BrowserWindow({ 'width': 1200, 'height': 900, icon: nativeImage.createFromPath(__dirname + 'media/icon.png') })
  mainWindow.loadFile(path.join(__dirname, 'pages/index.html'))
})
