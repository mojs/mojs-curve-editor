var path = require('path');
var webpack = require('webpack');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var packagejson = require('./package.json')


var webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    root: [
      path.resolve('./'),
      path.resolve('./src')
    ],
    alias: {
      template: path.resolve(packagejson.templateDir)
    },
    extentions: ['.js', '.jsx', '.scss']
  }
};

  console.log('Dev mode')
  webpackConfig = merge(webpackConfig, {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:'+packagejson.listenPort,
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src')},
        { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        { test: /\.svg$/, loader: 'svg-inline'},
        { test: /\.json$/, loader: "json"},
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("app.css")
  ]
  });

module.exports = webpackConfig;
