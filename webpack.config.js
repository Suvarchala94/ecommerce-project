const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cwd = __dirname;
const isProd = process.env.NODE_ENV === "production";
const mode = isProd ? "production" : "development";
const srcDir = path.join(cwd, "src");
const distDir = path.join(cwd, "dist");
const entry = path.join(cwd, "src", "index.jsx");
const port = 3000;
module.exports = {
  mode,
  entry,
  target: "web",
  devtool: "source-map",
  output: {
    path: distDir,
    filename: "app.js",
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, "index.html"),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  resolve: {
    extensions: [".jsx", ".js", ".json", ".scss", ".css", "*"],
  },
  module: {
    rules: [
      {
        // Conditions:
        test: /\.jsx?$/,
        include: [srcDir],
        loader: "babel-loader",
      },
      {
        // Conditions:
        test: /\.s?css$/,
        include: [srcDir],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        // Conditions:
        test: /\.html$/,
        include: [srcDir],
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    port,
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // ...
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
