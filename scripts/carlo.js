#!/usr/bin/env node

const os = require('os')
const path = require('path')
const carlo = require('carlo')

const config = require('./config')

const launch = async () => {
  const app = await carlo.launch({
    userDataDir: path.join(os.tmpdir(), 'csv-select')
  })
  app.serveFolder(config.outDir)
  await app.load(config.indexFile)
}

launch()
