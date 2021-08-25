/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import webpack from 'webpack';
import path from 'path';
import pkg from './package.json';
import DashboardPlugin from 'webpack-dashboard/plugin';

// plugins
import  HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import themeConfig from './src/theme_config';
// variables
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

export default {
  context: sourcePath,
  entry: {
    app: './main.tsx',
  },
  output: {
    path: outPath,
    // filename: isProduction ? '[contenthash].js' : '[fullhash].js',
    // chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[fullhash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
    },
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: { plugins: ['react-hot-loader/babel'] },
          },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ].filter(Boolean),
      },
      // css
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: '@teamsupercell/typings-for-css-modules-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              modules: {
                auto: true,
                localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      }, {
        test: /node_modules\/.+\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          'style-loader',
          {
            loader: '@teamsupercell/typings-for-css-modules-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1,
              modules: {
                mode: 'global',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  '@primary-color': themeConfig.themeColor,
                  '@primary-gradient-color': themeConfig.gradientColor,
                  '@main-btn-bg': `linear-gradient(270deg, ${themeConfig.gradientColor} 0%, ${themeConfig.themeColor} 100%)`,
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          'style-loader',
          {
            loader: '@teamsupercell/typings-for-css-modules-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                namedExport: true,
                localIdentName: '[path][name]__[local]',
                exportOnlyLocals: false,
              },
              sourceMap: false,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    mergeDuplicateChunks: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
  },
  plugins: [
    !isProduction ? new DashboardPlugin() : null,
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      // disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
      },
      meta: {
        title: pkg.name,
        description: pkg.description,
        keywords: Array.isArray(pkg.keywords) ? pkg.keywords.join(',') : '',
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(__dirname, 'tsconfig.json'),
      },
    }),
  ].filter(Boolean),
  devServer: {
    static: sourcePath,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    client: {
      logging: 'warn',
    },
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
  // node: {
  //   // workaround for webpack-dev-server issue
  //   // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
  //   fs: 'empty',
  //   net: 'empty',
  // },
};
