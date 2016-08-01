var path = require('path');
var webpack = require('webpack');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  watch:   true,
  context: __dirname + "/",
  entry: [
    __dirname + '/app/js/app.babel.js'
  ],
  module: {
    loaders: [
      { test: /\.(json)$/, exclude: /node_modules/, loaders: ['json-loader'] },
      { test: /\.(jsx|es6.js|babel.js|.js)$/,
        exclude: /node_modules/,
        loader:  'babel-loader',
        query: {
          presets: [ 'es2015', 'babel-preset-stage-2' ],
          plugins: [ 'transform-runtime' ]
        }
      },
      {
        test:   /\.tag$/,
        loader: 'riotjs-loader',
        type:   'babel',
        exclude: /node_modules/
      },
      { test: /\.jade$/, loaders: ['jade'] },
      { test: /\.(postcss.css)$/,  loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.(eot|woff|ttf|svg|png|jpg|wav|mp3)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      }
    ]
  },
  postcss: function () {
    return [ require('precss'), require('postcss-cssnext'), require('postcss-modules') ];
  },
  output: {
    path:           __dirname + '/app/build/',
    filename:       'mojs-curve-editor.min.js',
    publicPath:     'app/build/',
    library:        'mojs-curve-editor',
    libraryTarget:  'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.ProvidePlugin({
        riot: 'riot'
      }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
    new UnminifiedWebpackPlugin()
  ],
  resolve: {
    root: [ path.resolve('./') ],
    moduleDirectories: ['node_modules'],
    target: 'node',
    extensions: [
      '', '.js', '.es6', '.babel.js', '.coffee', '.tag',
      '.postcss.css', '.css', '.json'
    ]
  }
};
  