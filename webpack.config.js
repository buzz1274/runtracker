var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './knockout/main.js',
    output: {
        path: './public/',
        publicPath: '/',
        filename: 'main-[hash:6].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html?-minimize'
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
        new ExtractTextPlugin('main-[hash:6].css', {allChunks: true}),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          inject: true,
          template: './knockout/templates/index.ejs'
      })
    ]
};
