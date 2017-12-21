import Config from 'webpack-config';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

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
        // options: {
        //   modules: true,
        //   importLoaders: 1,
        //   localIdentName: "[local]__[hash:base64:5]",
        //   minimize: false
        // }
      },
      { 
        loader: 'postcss-loader',
        options: { plugins: [precss(), autoprefixer()]}
      },
      {
        loader: 'sass-loader', // compiles SASS to CSS
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
