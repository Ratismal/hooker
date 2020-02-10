// This module will load the config file

const fs = require('fs');
const path = require('path');

let config;

try {
  config = require('../config'); // load either js or json files
} catch (err) {
  console.error('Error loading config file. Please ensure it exists and try again.');
  process.exit(1);
  // console.error('Failed to load the config file. Using default...');

  // // copy over the default config file
  // fs.copyFileSync(path.join(__dirname, '..', 'default-config.js'), path.join(__dirname, '..', 'config.js'));

  // // load the default config file
  // config = require('../default-config.js');
}

module.exports = config;