var webpack = require('webpack');
var tsloader = require('awesome-typescript-loader');

module.exports = {
  entry: './src/ts/main.ts',
  output: {
    filename: './dist/js/bundle.js'
  },
  module:{
      loaders:[
          { test: /\.ts$/, loader: 'awesome-typescript-loader'},
      ]
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
  ]
}