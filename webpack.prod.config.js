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

  console.log('Production mode')
  webpackConfig = merge(webpackConfig, {
    devtool: 'cheap-module-source-map',
    entry: [
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
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: {
        except: ['$super', '$', 'exports', 'require']
    },
      compress: {
        dead_code: true,
        unused: true,
        drop_console: true,
        unsafe: true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({'NODE_ENV': JSON.stringify('production')}),
    new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    new ExtractTextPlugin("app.css"),
  ]
  });

module.exports = webpackConfig;
