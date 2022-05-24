/*
 * @Author: ran
 * @Date: 2022-02-14 16:09:18
 * @LastEditors: ran
 * @LastEditTime: 2022-04-20 21:06:00
 */
const path = require("path");
const LoadablePlugin = require("@loadable/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

const resolve = (filePath: string) => path.resolve(__dirname, filePath);

const DIST_PATH = resolve("client/index.tsx");

export default {
  entry: {
    index: DIST_PATH,
  },
  output: {
    filename: "[name].bundle.js",
    path: resolve("dist"),
    publicPath: "",
    globalObject: "this",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2015",
            },
          },
        ],
        exclude: "/node_modules/",
      },
      {
        test: /\.(js|jsx|tsx)?$/,
        use: [
          {
            loader: "auto-require-css",
            options: {
              mode: "module",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: { javascriptEnabled: true },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|ico|svg|xlsx)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "assets/[name].[hash:6][ext]",
          publicPath: "./",
        },
      },
    ],
  },
  resolveLoader: {
    modules: ["node_modules"],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015", // Syntax to compile to (see options below for possible values)
        css: true
      }),
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new LoadablePlugin(),
    new HtmlWebpackPlugin({
      template: "views/index.html",
      chunksSortMode: "none",
      filename: "views/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("client/assets/images/favicon.ico"),
          to: resolve("dist/public/images"),
        },
      ],
    }),
  ],
  devtool: "source-map",
};
