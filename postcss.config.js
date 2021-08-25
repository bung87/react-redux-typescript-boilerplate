const webpack = require('webpack')
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-url')(),
    require('postcss-preset-env')({
      /* use stage 2 features (defaults) */
      stage: 2,
    }),
    require('postcss-reporter')(),
    require('postcss-browser-reporter')({
      disabled: isProduction,
    }),
  ],

};
