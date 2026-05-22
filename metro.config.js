const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// Load .env before Metro bundles the app
require('dotenv').config({path: path.resolve(__dirname, '.env')});

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      '@env': path.resolve(__dirname, 'env-shim.js'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
