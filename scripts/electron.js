#!/usr/bin/env node

const path = require('path')
const { execSync } = require('child_process')

execSync(`npx electron ${path.join(__dirname, '../main.js')}`)
