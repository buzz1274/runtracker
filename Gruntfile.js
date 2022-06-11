module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.loadNpmTasks('grunt-webpack');

    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');

    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin(),
                    new webpack.DefinePlugin({
                            'process.env': {
                                'NODE_ENV': '"production"'
                            }
                        }
                    ))
            },
            build_dev: {
                debug: true
            }
        },
        watch: {
            app: {
                files: ['knockout/**/*{.js,.css,.less,.jsx}', 'public/**/*.html'],
                tasks: ['webpack:build_dev'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('dev', ['webpack:build_dev', 'watch:app']);
    grunt.registerTask('build', ['webpack:build']);

};