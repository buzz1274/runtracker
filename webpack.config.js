var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './knockout/main.js',
    output: {
        path: './public/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: '/tmp/babel_cache/',
                    presets: ['es2015']
                }
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            ko: 'knockout-es5',
        }),
        new ExtractTextPlugin('main.css', {allChunks: true})
    ]
};