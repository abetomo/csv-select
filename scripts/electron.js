#!/usr/bin/env node

/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path')
const { execFileSync } = require('child_process')

const cmd = 'npx'
const args = ['electron', path.join(__dirname, '../main.js')]
execFileSync(cmd, args)
