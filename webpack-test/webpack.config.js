/**
 * Created by gedune on 2017/8/17.
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app:'./app/main.js',
    hello: './app/hello.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'), //打包后的文件存放的地方
    filename: '[name].bundle.js'
  },
  plugins: [
    // OccurenceOrderPlugin is needed for webpack 1.x only
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'temple.html',
      chunks: ['app'],  //设置chunks字段未入口的配置的字段即可
    }),
    new HtmlWebpackPlugin({
      template: 'temple.html',
      chunks: ['hello'],
      filename: 'index-2.html'
    })
  ],
  module: {
     rules: [
       {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
         }
     ]
  },

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    hot: true
  }
}