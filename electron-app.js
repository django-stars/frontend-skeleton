const {app, protocol, webFrame, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

protocol.registerStandardSchemes(['ds'])

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow (eee) {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {webSecurity: false}
  })

  win.loadURL('ds://django.stars/')

  // Open the DevTools.
  win.webContents.openDevTools()

  win.webContents.executeJavaScript('require("electron").webFrame.registerURLSchemeAsPrivileged("ds", {bypassCSP: false});')
  // FIXME not working
  //win.webContents.executeJavaScript('require("electron").webFrame.registerURLSchemeAsBypassingCSP("http");')
  //win.webContents.executeJavaScript('require("electron").webFrame.registerURLSchemeAsSecure("ds");')

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

process.on('uncaughtException', function(error) {
    console.error("ERROR Exception => " + error.stack);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  protocol.registerFileProtocol('ds', (request, callback) => {
    const location = url.parse(request.url)
    const fpath = `${__dirname}/dist${location.pathname}`
    const pathname =
      fs.existsSync(fpath) && fs.lstatSync(fpath).isFile() ?
      location.pathname : 'index.html'

    callback({path: path.normalize(`${__dirname}/dist/${pathname}`)})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
