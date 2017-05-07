var merge = require('webpack-merge')

var prodConfig = {
	NODE_ENV: '"production"'
};

var devConfig = merge(prodConfig, {
  NODE_ENV: '"development"'
})

var testConfig = merge(prodConfig, {
  NODE_ENV: '"testing"'
})


module.exports = {
	prodConfig: prodConfig,
	devConfig: devConfig,
	testConfig: testConfig
}
