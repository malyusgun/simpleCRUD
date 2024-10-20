import path from "path";

export default {
  entry: "./index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "dist"),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [],

  devServer: {
    static: {
      directory: path.join(process.cwd(), "dist"),
    },
    open: true,
  },

  mode: "development",
};
