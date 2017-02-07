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
    }
};