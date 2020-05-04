const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const webpackBundleAnalyzer = require("webpack-bundle-analyzer");

// removing css plugin for issue check
// from plugins:
// new MiniCssExtractPlugin({
//   filename: "[name].[contenthash].css",
// }),
// new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzeMode: "static" }),
// new webpack.DefinePlugin({
//   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
//   "process.env.API_URL": JSON.stringify("http://localhost:3001"),
// }),
// from test \css\
//
// use: [
//   MiniCssExtractPlugin.loader,
//   {
//     loader: "css-loader",
//     options: {
//       sourceMap: true,
//     },
//   },
//   {
//     loader: "postcss-loader",
//     options: {
//       plugins: () => [require("cssnano")],
//       sourceMap: true,
//     },
//   },
// ],
// },

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        use: "file-loader",
      },
      {
        test: /\.pdf$/,
        use: "url-loader",
      },
    ],
  },
};
