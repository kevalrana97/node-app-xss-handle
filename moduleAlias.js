'use strict'

const ModuleAlias = require('module-alias')

ModuleAlias.addAliases({
  '@routes': __dirname + '/src/routes',
  '@utils': __dirname + '/src/utils',
  '@validation': __dirname + '/src/validation'
})
