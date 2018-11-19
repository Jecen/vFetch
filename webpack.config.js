const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/vFetch.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vFetch.min.js'
  }
}