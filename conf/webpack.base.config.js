import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default new Config().merge({
  entry: './src/app.js',
  output: {
    path: __dirname + '/../public',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',  
        exclude: /node_modules/,     
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: "body"
    }),
    new ExtractTextPlugin("bundle.min.css"),
  ]
});
