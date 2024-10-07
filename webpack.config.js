const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    publicPath: 'public',
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: [/\.css$/i, /\.scss$/i],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/i,
        use: ['ts-loader'],
      },
    ],
  },
};