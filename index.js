const path = require('path')

const carlo = require('carlo')
const Bundler = require('parcel-bundler')

const outDir = path.join(__dirname, 'dist')
const entryFile = path.join(__dirname, 'src', 'index.html')

const bootstrap = async () => {
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
