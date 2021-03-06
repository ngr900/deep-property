const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/deep-property.js',
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'deep-property.js',
    library: 'deep-property',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
};