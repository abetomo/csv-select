const http = require('http')
const path = require('path')
const { app, dialog, ipcMain, BrowserWindow } = require('electron')

const isDev = process.env.NODE_ENV === 'dev'

let url = null
if (isDev) {
  const { loadNuxt, build } = require('nuxt-edge')
  ;(async () => {
    const nuxt = await loadNuxt('dev')
    await build(nuxt)
    const server = await nuxt.server.listen()
    url = server.url
  })()
} else {
  url = 'file://' + __dirname + '/.output/public/index.html' // eslint-disable-line no-path-concat
}

// Electron
ipcMain.on('open-dialog', (event, options) => {
  event.returnValue = dialog.showOpenDialogSync(options)
})

let win = null
const newWin = () => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(path.join(__dirname, 'preload.js')),
      nativeWindowOpen: true, // https://github.com/electron/electron/issues/28511
    },
  })
  win.setMenu(null)
  win.on('closed', () => (win = null))
  if (!isDev) {
    win.loadURL(url)
    return
  }

  // dev mode
  const pollServer = () => {
    http
      .get(url, (res) => {
        if (res.statusCode === 200) {
          win && win.loadURL(url)
        } else {
          setTimeout(pollServer, 300)
        }
      })
      .on('error', pollServer)
  }
  pollServer()
  win.webContents.openDevTools()
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
