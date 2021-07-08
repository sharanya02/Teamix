const electron = require('electron')
const path = require('path')
const { app, BrowserWindow } = electron

app.on('ready', () => {
  const mainWindow = new BrowserWindow({})
  mainWindow.loadFile(path.join(__dirname, 'pages/index.html'))
})
