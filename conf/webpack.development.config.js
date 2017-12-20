import Config from 'webpack-config';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [ {
      test: /\.(scss)$/,
      use: [{
        loader: 'style-loader', // inject CSS to page
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS modules
      },
      {
        loader: 'sass-loader', // inject CSS to page
      }
    ]
    }]
  },
});
