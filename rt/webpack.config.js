var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './knockout/app.js',
    output: {
        path: './public/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'html' },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    externals: {
        'ko': 'ko'
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
        new ExtractTextPlugin("main.css", {allChunks: true})
    ]
};