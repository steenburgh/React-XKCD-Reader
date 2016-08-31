const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const SRC_PATH = path.join(__dirname, "src");

module.exports = {
  entry: "./src/Root",
  module: {
    loaders: [

      // This loader will compile our code
      // with Typescript instead of Babel.
      // {
      //   include: SRC_PATH,
      //   loader: "awesome-typescript-loader",
      //   test: /\.(j|t)s$/,
      // },

      // This loader will compile our code with Babel,
      // which allows us to use ES6 syntax and imports.
      {
        include: SRC_PATH,
        loaders: ["babel"],
        test: /\.js$/,
      },

      // This loader allows us to import css files inside our js files
      // instead of placing them in our HTML file:
      //   import "styles/site.css";
      {
        include: SRC_PATH,
        loader: "style-loader!css-loader",
        test: /\.css$/,
      },

    ],
  },

  // This specifies where webpack should place the compiled result,
  // and what the file should be named.
  // Note that "/static/client.js" is the src file in the script tag
  // that we include in our index.html file.
  output: {
    path: path.join(__dirname, "dist"),
    filename: "static/client.js",
  },
  plugins: [
    // Tell modules like react that we are in production mode
    // https://facebook.github.io/react/downloads.html#npm
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),

    // Copy static assets so we don't have to run them through webpack
    new CopyWebpackPlugin([
      { from: "static", to: "static"},
      { from: "index.html" },
    ]),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
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
