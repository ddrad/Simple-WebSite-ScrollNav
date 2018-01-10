import Config from 'webpack-config';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(json)$/,
      loader: 'json-loader'
    },{
      test: /\.(scss)$/,
      use: ExtractTextPlugin.extract({
                    use: [
                      {
                      loader: "css-loader",
                        options: {
                          sourceMap: true,
                          modules: false,
                          importLoaders: 2,
                          localIdentName: "[local]__[hash:base64:5]",
                        }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        ident: 'postcss', // <= this line
                        plugins: [precss(), autoprefixer()],
                        sourceMap: true
                      }
                    },
                    {
                      loader: "sass-loader",
                       options: {
                           sourceMap: true
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
  }
});
