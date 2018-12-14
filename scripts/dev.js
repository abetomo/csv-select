const carlo = require('carlo')
const Bundler = require('parcel-bundler')

const config = require('./config')

const bootstrap = async () => {
  const opts = {
    outDir: config.outDir,
    outFile: config.indexFile,
    sourceMaps: true,
    hmr: false
  }

  const bundler = new Bundler(config.entryFile, opts)
  await bundler.bundle()
  const app = await carlo.launch()
  app.serveFolder(config.outDir)
  await app.load(config.indexFile)
}

bootstrap()
