var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  context: __dirname + "/",
  entry: [
    __dirname + '/app/js/app.babel.jsx'
    // 'webpack/hot/dev-server',
  ],
  module: {
    preLoaders: [
      {
        exclude: /src\//,
        loader: 'source-map'
      }
    ],
    loaders: [
      { test: /\.(json)$/, exclude: /node_modules/, loaders: ['json-loader'] },
      { test: /\.(jsx|.js|babel.jsx|babel.js)$/,
        exclude: /node_modules/,
        loader:  'babel-loader'
      },
      // {
      //   test:   /\.tag$/,
      //   loader: 'riotjs-loader',
      //   type:   'babel',
      //   exclude: /node_modules/
      // },
      // { test: /\.jade$/, loaders: ['jade'] },
      { test: /\.(postcss.css)$/,  loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.(eot|woff|ttf|svg|png|jpg|wav|mp3)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      }
    ]
  },
  postcss: function () {
    return {
      defaults: [ require('precss'), require('postcss-cssnext'), require('postcss-modules') ],
      cleaner:  [autoprefixer({ browsers: ['last 2 versions'] })]
    };
  },
  output: {
    path:           __dirname + '/app/build/',
    filename:       'mojs-curve-editor.min.js',
    publicPath:     'build/',
    library:        'mojs-curve-editor',
    libraryTarget:  'umd',
    umdNamedDefine: true,
    // hotUpdateChunkFilename: "[id].hot-update.js"
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   h: 'preact'
    // }),
    // new webpack.NoErrorsPlugin(),
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new UnminifiedWebpackPlugin()
    // new webpack.HotModuleReplacementPlugin()
  ],
  // devtool: process.env.NODE_ENV==='production' ? 'source-map' : 'inline-source-map',
  resolve: {
    root: [ path.resolve('./') ],
    moduleDirectories: ['node_modules'],
    target: 'node',
    extensions: [
      '', '.js', '.babel.js', '.babel.jsx',
      '.postcss.css', '.css', '.json'
    ]
  }
};
