var page = require('page'),
    Runs = require('./views/runs/index.js');

module.exports = (function () {
    'use strict';

    function Router(app) {
        this.app = app;
        this.runs = new Runs();

        var that = this;

        page.base('/');

        page('', function() {
            app.page = 'home';
        });

        page('register', function() {
            app.page = 'register';
        });

        page('login', function() {
            app.page = 'login';
        });

        page('reset_password', function() {
            app.page = 'reset_password';
        });

        page('runs/:date?/:activity_id?/', function(ctx) {
            app.pages['runs'].loadData(ctx.params.activity_id,
                                       ctx.params.date).done(function() {

            }).fail(function() {
                alert("FAILURE");
            });

            app.page = 'runs';

        });

        page('*', function() {
            var error = app.pages.error;

            error.code = 404;
            error.message = 'Page Not Found';
            app.page = 'error';
        });

        page();

    }

    return Router;

})();