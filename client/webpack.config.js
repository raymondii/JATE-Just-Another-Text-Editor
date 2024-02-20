const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',
      install: './client/src/js/install.js'
    },
    output: {
      filename: 'JATE.bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        icons: [
          {
            src: path.resolve('./client/src/images/logo.png'), // Adjusted path to app icon
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js', // Path to your service worker source file
        swDest: 'sw.js', // Output service worker file name
        exclude: [/\.map$/, /manifest\.json$/, /install\.html$/],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './dist'),
      },
      compress: true,
      port: 8080,
      watchFiles: ['./src/**/*']
    },
  };
};
