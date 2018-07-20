import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

const mainProcessConfig: webpack.Configuration = {
  entry: "./src/main_process/main.ts",
  target: "electron-main",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".elm", ".js", "ts"]
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "out"),
    libraryTarget: "commonjs2"
  },
  node: {
    __dirname: false,
    __filename: false
  }
};

const renderProcessConfig: webpack.Configuration = {
  entry: "./src/render_process/index.js",
  target: "electron-renderer",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.elm$/,
        use: "elm-webpack-loader",
        exclude: [/elm-stuff/, /node_modules/]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/static/index.html")
    })
  ],
  resolve: {
    extensions: [".elm", ".js", "ts"]
  },
  output: {
    filename: "render.js",
    path: path.resolve(__dirname, "out"),
    libraryTarget: "commonjs2"
  },
  node: {
    __dirname: false,
    __filename: false
  }
};

export default [mainProcessConfig, renderProcessConfig];
