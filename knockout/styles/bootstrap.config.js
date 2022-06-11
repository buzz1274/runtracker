module.exports = {
    styleLoader: require('extract-text-webpack-plugin').
        extract('style-loader', 'css-loader!postcss-loader!less-loader'),
    scripts: {
        'transition': true,
        'dropdown': true,
        'button': true,
        'modal': true,
    },
    styles: {
        'normalize': true,
        'tables': true,
        'dropdowns': true,
        'mixins': true,
        'navs': true,
        'scaffolding': true,
        'grid': true,
        'modals': true,
        'buttons': true,
        'typography': true,
        'forms': true,
        'utilities': true,
        'glyphicons': true,
        "type": true,
        "close": true,
    }
};