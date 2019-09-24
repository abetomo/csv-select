#!/usr/bin/env node

const fs = require('fs-extra')
const Bundler = require('parcel-bundler')

const config = require('./config')

fs.removeSync(config.outDir)

const isProduction = (() => {
  // Default is true
  if (process.env.NODE_ENV == null) return true
  return process.env.NODE_ENV === 'production'
})()

const build = async () => {
  const opts = {
    production: isProduction,
    outDir: config.outDir,
    outFile: config.indexFile,
    sourceMaps: true,
    hmr: false
  }

  const bundler = new Bundler(config.entryFile, opts)
  await bundler.bundle()
}

build()
