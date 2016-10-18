import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import UnminifiedWebpackPlugin from 'unminified-webpack-plugin';

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProduction = LAUNCH_COMMAND === 'production';
process.env.BABEL_ENV = LAUNCH_COMMAND

const base = {
  context: __dirname + '/',
  entry: [
    __dirname + '/app/js/app.babel.jsx'
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
      { test: /\.(postcss.css)$/,  loader: 'style-loader!css-loader!postcss-loader' },
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
  },
  plugins: [new UnminifiedWebpackPlugin()],
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

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const developmentConfig = {
  // devtool: 'inline-source-map'
  // watch:   true,
}

const productionConfig = {
  // devtool: 'source-map',
  plugins: [productionPlugin, new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})]
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)
