var webpack = require('webpack');
var tsloader = require('awesome-typescript-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('/dist/css/main.css');

module.exports = {
  entry: './src/ts/main.ts',
  output: {
    filename: './dist/js/bundle.js'
  },
  module:{
      loaders:[
          { test: /\.ts$/, loader: 'awesome-typescript-loader'},
          { test: /\.css$/, loader: extractCSS.extract('css-loader')},
          { test: /\.scss$/, loader: extractCSS.extract('css-loader!sass-loader')}
      ]
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      extractCSS
  ]
}