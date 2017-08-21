/**
 * Created by gedune on 2017/8/17.
 */
module.exports = {
  entry: './app/main.js','webpack-hot-middleware/client',
  output: {
    path: "/public",//打包后的文件存放的地方
    filename: 'bundle.js'
  },
  plugins: [
    // OccurenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],


  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }
}