require('ts-node').register({
  compilerOptions: {
    module: 'CommonJS',
    project: "."
  },
  // and other tsconfig.json options as you like
});
const config = require('./webpack.config.ts').default
module.exports = config
