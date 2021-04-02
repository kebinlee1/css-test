/**
 * Server Config
 */
const path = require('path')

module.exports = {
  port: '3000',

  static_default: path.join(__dirname, 'templates/templated-binary'),
  // static_default: path.join(__dirname, 'templates/templated-industrious'),
  // static_default: path.join(__dirname, 'templates/templated-theory'),
  // static_default: path.join(__dirname, 'templates/templated-transitive'),

  nodeModules: path.join(__dirname, './node_modules')
}