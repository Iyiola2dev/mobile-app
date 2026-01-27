// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");

if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function() {
    return [...this].reverse();
  };
}

module.exports = getDefaultConfig(__dirname);
