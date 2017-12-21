import webpack from 'webpack';
import Config from 'webpack-config';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [{
      test: /\.(scss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          // options: {
          //   modules: true,
          //   importLoaders: 1,
          //   localIdentName: "[hash:base64:10]",
          //   minimize: true
          // }
        },
        {
          loader: 'postcss-loader',
          options: { plugins: [precss(), autoprefixer()]}
        }, {
          loader: 'sass-loader', // compiles SASS to CSS
        }
      ]
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name][hash].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      },
      ],
    },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })]
});
