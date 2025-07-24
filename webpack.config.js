const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
require('dotenv').config(); 

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/', 
  },
  mode: process.env.NODE_ENV || 'development', 
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || '/api'), 
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: process.env.PORT || 8080, 
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0', 
    allowedHosts: 'all', 
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};