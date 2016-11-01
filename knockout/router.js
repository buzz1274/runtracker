var page = require('page');

module.exports = (function () {
    'use strict';

    function Router(app) {
        this.app = app;

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

        page('runs/:date?/', function(ctx) {

            app.pages['runs'].loadData(ctx.params.activity_id,
                                       ctx.params.date).done(function() {

                app.page = 'runs';

            }).fail(function() {
                var error = app.pages.error;

                error.code = 500;
                error.message = 'An error occurred';
                app.page = 'error';

            });

        });

        page('*', function() {
            var error = app.pages.error;

            error.code = 404;
            error.message = 'Page not found';
            app.page = 'error';

        });

        page();

    }

    return Router;

})();