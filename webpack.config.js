const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

module.exports = {
  entry: "./src/server.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new StartServerPlugin({
      name: "server.js",
      // nodeArgs: ["--inspect"],
      // args: ["scriptArgument1", "scriptArgument2"],
      signal: false,
      keyboard: false,
    }),
  ],
};
