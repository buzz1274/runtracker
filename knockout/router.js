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
            var date = ctx.params.date;

            if(!date) {
                date = 'all';
            }

            app.pages['runs'].loadData(date);
            app.page = 'runs';

        });

        page('error/:code', function(ctx) {
            var error = app.pages.error;

            error.code = ctx.params.code;
            app.page = 'error';

            if(ctx.params.code == 500) {
                error.message = 'An error occurred';
            } else if(ctx.params.code == 404) {
                error.message = 'Page not found';
            }

        });

        page('*', function() {
            page('/error/404');
        });

        page();

    }

    return Router;

})();