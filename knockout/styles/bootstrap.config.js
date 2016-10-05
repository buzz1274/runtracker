module.exports = {
    styleLoader: require('extract-text-webpack-plugin').
        extract('style-loader', 'css-loader!postcss-loader!less-loader'),
    scripts: {
        'transition': true,
        'button': true,
    },
    styles: {
        'normalize': true,
        'tables': true,
        'mixins': true,
        'navs': true,
        'scaffolding': true,
        'grid': true,
        'buttons': true,
        'typography': true,
        'forms': true,
        'utilities': true,
        'glyphicons': true
    }
};