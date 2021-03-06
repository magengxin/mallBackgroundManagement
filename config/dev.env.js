'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://media.datuhongan.net"',
  // BASE_API: '"https://daoyin.datuhongan.com"',
  BASE_API: '"https://daoyin.datuhongan.com"',
})
