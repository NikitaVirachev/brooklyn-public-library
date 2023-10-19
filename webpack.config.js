const path = require('path');

module.exports = {
  entry: './src/script/controller.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};
