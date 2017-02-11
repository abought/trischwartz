var webpack = require("webpack");

module.exports = {
    entry: "./demo/entry.js",
    output: {
        path: 'demo',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
          warnings: false
        }
      })
    ]
};