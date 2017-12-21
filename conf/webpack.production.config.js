import webpack from 'webpack';
import Config from 'webpack-config';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [{
      test: /\.(scss)$/,
      use: ExtractTextPlugin.extract({
                    use: [
                      {
                      loader: "css-loader",
                        options: {
                          modules: false,
                          importLoaders: 2,
                          localIdentName: "[local]__[hash:base64:5]",
                        }
                    },
                    {
                      loader: "sass-loader",
                       options: {
                            sourceMap: false
                      }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        plugins: [precss(), autoprefixer()]
                      }
                    }
                  ],
                  fallback: "style-loader"
                })
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
