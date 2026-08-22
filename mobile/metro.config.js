const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {resolver} = require('metro-react-native-babel-preset');

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
