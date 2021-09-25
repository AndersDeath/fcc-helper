const path = require('path');
const package = require('./package.json');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, `./dist`),
    filename: `fh-${package.version}.js`
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
 plugins: [
   new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "fh-default.css"),
        to: path.resolve(__dirname, `./dist/fh-default-${package.version}.css`),
      },
    ],
  })
 ]
};