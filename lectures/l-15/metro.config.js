const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Peker til hvor CSS-filen ligger
module.exports = withNativeWind(config, { input: "./app/global.css" });
