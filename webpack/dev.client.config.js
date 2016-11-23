const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: 'node_modules',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "react",
                ["latest", {
                  "es2015": {
                    "modules": false
                  }
                }],
                "stage-0"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: 'node_modules',
        loader: 'style-loader!css-loader?modules'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style-[hash].css'),
    new ManifestPlugin()
  ],
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '..', 'src', 'client', 'index.js')
  ],
  target: "web",
  output: {
    path: path.resolve(__dirname, '..', 'build', 'dist'),
    filename: 'main-[hash].js',
    publicPath: '/'
  }
};