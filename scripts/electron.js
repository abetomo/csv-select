#!/usr/bin/env node

const path = require('path')
const { execFileSync } = require('child_process')

const cmd = 'npx'
const args = ['electron', path.join(__dirname, '../main.js')]
execFileSync(cmd, args)
