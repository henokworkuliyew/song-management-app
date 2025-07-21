const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].[contenthash].js', 
    clean: true, 
  },
  mode: 'development',
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
      'process.env.API_BASE_URL': JSON.stringify('http://localhost:8080/api'), 
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), 
    port: 8080,
    hot: true, 
  },
  optimization: {
    splitChunks: {
      chunks: 'all', 
    },
  },
};