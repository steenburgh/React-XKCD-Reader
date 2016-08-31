var path = require("path");
var webpack = require("webpack");

var SRC_PATH = path.join(__dirname, "src");

module.exports = {

  // Mode in which the code is compiled by webpack.
  //  "eval" will perform fastest builds and rebuilds, but does not provide source maps
  //  "cheap-eval-source-map" is fast and will provide non-perfect source maps
  //  "eval-source-map" will provide perfect source maps
  devtool: "source-map",
  entry: [

    // These lines are necessary for React Hot Loader.
    // To change the port, edit the number at the end of the 2nd entry
    // (and also edit the value in server.js).
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:9090",
    "webpack/hot/only-dev-server",

    // This is the file in our source code that webpack should start with.
    "./src/Root",
  ],
  module: {
    loaders: [
      // This loader will compile our code with Babel,
      // which allows us to use ES6 syntax and imports.
      {
        include: SRC_PATH,
        loaders: ["babel"],
        test: /\.js$/,
      },
    ],
    preLoaders: [

      // This will help webpack generate source maps for compiled files.
      {
        include: SRC_PATH,
        loader: "source-map-loader",
        test: /\.js$/,
      },
    ],
  },

  // This specifies where webpack should place the compiled result,
  // and what the file should be named.
  // Note that "/static/client.js" is the src file in the script tag
  // that we include in our index.html file.
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.js",
    publicPath: "/static/",
  },
  plugins: [

    // This plugin allows our page to automatically reload
    // after saving changes during development.
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ["", ".js", ".ts"],

    // This is where webpack will look for files when it sees an import statement.
    modulesDirectories: [

      // This allows us to write:
      //   import HomePage from "home/components/HomePage";
      // instead of:
      //   import HomePage from "src/home/components/HomePage";
      "src",

      // This allows us to write:
      //   import React from "react";
      // instead of:
      //   import React from "node_modules/react";
      "node_modules",
    ],
  },
};

