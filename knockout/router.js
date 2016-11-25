var page = require('page');

module.exports = (function () {
    'use strict';

    function Router(app) {
        page.base('/');

        page('', function() {
            app.page = 'home';
            app.display_left_nav = false;
        });

        page('register', function() {
            app.page = 'register';
            app.display_left_nav = false;
        });

        page('login', function() {
            app.page = 'login';
            app.display_left_nav = false;
        });

        page('reset_password', function() {
            app.page = 'reset_password';
            app.display_left_nav = false;
        });

        page('runs/:date?/', function(ctx) {
            var date = ctx.params.date;

            if(!date) {
                date = 'all';
            }

            app.pages['runs'].loadData(date);
            app.pages['runs'].loadActivityTypes();

            app.page = 'runs';
            app.display_left_nav = true;

        });

        page('error/:code', function(ctx) {
            var error = app.pages.error;

            error.code = ctx.params.code;
            app.page = 'error';
            app.display_left_nav = false;

            if(ctx.params.code == 500) {
                error.message = 'An error occurred';
            } else if(ctx.params.code == 404) {
                error.message = 'Page not found';
            }

        });

        page('*', function() {
            page('/error/404');
            app.display_left_nav = false;
        });

        page();

    }

    return Router;

})();