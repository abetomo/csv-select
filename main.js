const http = require('http')
const path = require('path')
const { app, dialog, ipcMain, BrowserWindow } = require('electron')

const config = (() => {
  try {
    return require('./nuxt.config.js')
  } catch {}
  return {}
})()

let url = 'file://' + __dirname + '/dist/index.html' // eslint-disable-line no-path-concat
if (config.dev) {
  const { Nuxt, Builder } = require('nuxt')
  const nuxt = new Nuxt(config)
  const builder = new Builder(nuxt)

  builder.build().catch((err) => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
  const server = http.createServer(nuxt.render)
  server.listen()
  url = `http://localhost:${server.address().port}`
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
  if (!config.dev) {
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
