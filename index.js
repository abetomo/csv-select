const fs = require('fs')
const path = require('path')

const carlo = require('carlo')
const Bundler = require('parcel-bundler')

const outDir = path.join(__dirname, 'dist')
const entryFile = path.join(__dirname, 'src', 'index.html')
const sqlJsPath = path.join(__dirname, 'src/sql.js')


const bootstrap = async () => {
  if (!fs.existsSync(sqlJsPath)) {
    await new Promise((resolve) => {
      require('request').get({
        url: 'https://raw.githubusercontent.com/kripken/sql.js/master/js/sql.js',
      }, (error, response, body) => {
        fs.writeFileSync(sqlJsPath, body)
        resolve()
      });
    })
  }
  const opts = {
    outDir,
    outFile: 'index.html',
    sourceMaps: true,
    hmr: false
  }

  const bundler = new Bundler(entryFile, opts)
  await bundler.bundle()
  const cApp = await carlo.launch()
  cApp.serveFolder(outDir)
  await cApp.load('index.html')
}

bootstrap()
