const fs = require('fs-extra')
const Bundler = require('parcel-bundler')

const config = require('./config')

fs.removeSync(config.outDir)

const build = async () => {
  const opts = {
    production: process.env.NODE_ENV === 'production',
    outDir: config.outDir,
    outFile: config.indexFile,
    sourceMaps: true,
    hmr: false
  }

  const bundler = new Bundler(config.entryFile, opts)
  await bundler.bundle()
}

build()
