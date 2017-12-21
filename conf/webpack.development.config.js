import Config from 'webpack-config';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [  {
      test: /\.(scss)$/,
      use: [{
        loader: 'style-loader', // inject CSS to page
      }, {
        loader: 'css-loader', // translates CSS into CommonJS modules
      }, {
        loader: 'postcss-loader', // Run post css actions
        options: {
          plugins: function () { // post css plugins, can be exported to postcss.config.js
            return [
              require('precss'),
              require('autoprefixer')
            ];
          }
        }
      }, {
        loader: 'sass-loader' // compiles SASS to CSS
      }]
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
