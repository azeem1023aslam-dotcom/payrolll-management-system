const { composePlugins, withNx } = require('@nx/webpack');
const { join } = require('path');
 
// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  
  // Ensure output is set correctly
  if (!config.output) {
    config.output = {};
  }
  config.output.path = join(__dirname, '../../dist/apps/auth');
  config.output.filename = 'main.js';
  
  return config;
});